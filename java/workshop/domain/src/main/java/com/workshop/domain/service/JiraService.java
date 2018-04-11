package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.platform.util.GsonUtil;
import com.workshop.domain.constant.Phase;
import com.workshop.domain.entity.jira.IssueInfo;
import com.workshop.domain.entity.jira.Item;
import com.workshop.domain.entity.jira.Jira;
import com.workshop.domain.entity.jira.JiraUser;
import com.workshop.domain.entity.project.PhaseItem;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.entity.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Created by bill.wang on 3/16/18
 */
@Component
public class JiraService extends BaseService<Jira, String> {
    private final RestTemplate restTemplate;

    private final TaskService taskService;
    private final TeamService teamService;
    private final UserService userService;

    private final ThreadPoolTaskExecutor taskExecutor;


    private static final String SILVER_TEAM_ID = "5aaa3e7d8b23b7d0764c72d0";

    public JiraService(
            MongoRepository<Jira, String> repository,
            RestTemplate restTemplate,
            TaskService taskService,
            TeamService teamService,
            UserService userService,
            ThreadPoolTaskExecutor taskExecutor) {
        super(repository);

        this.restTemplate = restTemplate;

        this.taskService = taskService;
        this.teamService = teamService;
        this.userService = userService;

        this.taskExecutor = taskExecutor;
    }

    public JiraUser getJiraByUserName(String userName) {
        String url = String.format("https://gojira.skyscanner.net/rest/api/2/search?jql=assignee=%s", userName);


        HttpEntity<String> entity = new HttpEntity<>(getAuthHeaders());

        ResponseEntity<JiraUser> response = restTemplate.exchange(url, HttpMethod.GET, entity, JiraUser.class);

        return response.getBody();
    }

    public IssueInfo getJiraIssue(String issueId) {
        String url = String.format("https://gojira.skyscanner.net/rest/api/2/issue/%s?expand=changelog", issueId);

        HttpEntity<String> entity = new HttpEntity<>(getAuthHeaders());

        ResponseEntity<IssueInfo> response = restTemplate.exchange(url, HttpMethod.GET, entity, IssueInfo.class);

        return response.getBody();
    }

    public List<IssueInfo> getJiraIssuesByUserName(String userName) {
        List<IssueInfo> result = new ArrayList<>();

        JiraUser jiraUser = getJiraByUserName(userName);

        jiraUser.issues.forEach(o -> {
            result.add(getJiraIssue(o.key));
        });

        return result;
    }


    private HttpHeaders getAuthHeaders() {
        try {
            Jira jira = get().datum.get(0);
            String encoding = Base64.getEncoder().encodeToString(String.format("%s:%s", jira.name, jira.password).getBytes("UTF-8"));
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Basic " + encoding);
            return headers;
        } catch (Exception ex) {
            return null;
        }
    }

//    public Object getJiraIssueByScale(){
//        String url = "https://gojira.skyscanner.net/rest/api/2/search?jql=" + "project = dbs AND type != Epic AND labels in (Live_Partner_Support) AND (component is EMPTY OR component not in (Commercial, Pre-Integrations)) AND issuetype != \"Sprint Goals\" AND (fixVersion is EMPTY OR fixVersion not in (dBook_Jazzberry_Jam, dBook_Design, dBook_Gold, dBook_green_flag, dBook_Silver, dBook_Aqua, dBook_scale_ndc)) AND status not in (Done, Canceled, Closed, Declined)";
//        HttpEntity<String> entity = new HttpEntity<>(getAuthHeaders());
//
//        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
//
//        return response.getBody();
//    }

    private void buildTask(IssueInfo info, String userId) {
        try {
            Task task = new Task();

            task.setId(info.key);
            System.out.println("Id: " + info.key);
            task.assigneeId = getUserId(info.fields.assignee.name);
            task.reporterId = getUserId(info.fields.creator.name);

            task.title = info.fields.summary;
            task.startDate = convertFromString(info.fields.created);

            buildPhases(info, task);

            task.teamId = SILVER_TEAM_ID;

            // 如果Task没有就新建
            // 如果Task已经有了，检查是否被Review过了，没有review过才更新
            Task dbTask = taskService.get(task.getId()).data;
            if (dbTask == null) {
                taskService.create(task);
            } else {
                if (!dbTask.isReviewed) {
                    taskService.update(task);
                }
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void buildPhases(IssueInfo info, Task task) {
        List<PhaseItem> phases = new ArrayList<>();

        info.changelog.histories.forEach(o -> {
            for (Item item : o.items) {
                System.out.println(String.format("item: %s", GsonUtil.toJson(item)));
                if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.equals("Analysis")) {
                    phases.add(new PhaseItem(Phase.ToDo.name(), getUserId(o.author.name), convertFromString(o.created)));
                } else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("in progress")) {
                    phases.add(new PhaseItem(Phase.InProgress.name(), getUserId(o.author.name), convertFromString(o.created)));
                } else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("waiting for review")) {
                    phases.add(new PhaseItem(Phase.Reviewing.name(), getUserId(o.author.name), convertFromString(o.created)));
                } else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("waiting for customer")) {
                    phases.add(new PhaseItem(Phase.Blocked.name(), getUserId(o.author.name), convertFromString(o.created)));
                } else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("ready for deployment")) {
                    phases.add(new PhaseItem(Phase.Deployed.name(), getUserId(o.author.name), convertFromString(o.created)));
                } else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.equals("Done")) {
                    task.endDate = convertFromString(o.created);
                    phases.add(new PhaseItem(Phase.Done.name(), getUserId(o.author.name), task.endDate));
                } else if (item.field.equals("Story Points") && item.fieldtype.equals("custom")) {
                    try {
                        task.value = Integer.parseInt(item.toString);
                    } catch (Exception ex) {
                        task.value = 0;
                    }
                }
            }
        });

        task.phaseItems = phases;
    }

    private String getUserId(String userName) {
        User user = userService.get().datum.stream().filter(o -> userName.equals(o.jiraUserName)).findFirst().orElse(null);

        return user == null ? null : user.getId();
    }

    private LocalDateTime convertFromString(String created) {
        return LocalDateTime.parse(created.substring(0, created.length() - 5));
    }

    // 导出数据到Task数据库里面
    public void exportTasks() {
//        users.forEach((k, v) -> {
//            getJiraIssuesByUserName(k).forEach(o -> {
//                buildTask(o, v);
//            });
//        });

        //users.forEach((k, v) -> taskExecutor.execute(new JiraUserTask(k, v)));
        userService.get().datum.forEach(o -> taskExecutor.execute(new JiraUserTask(o.jiraUserName, o.getId())));
    }

    public class JiraIssueTask implements Runnable {
        String issueId;
        String userId;

        public JiraIssueTask(String issueId, String userId) {
            this.issueId = issueId;
            this.userId = userId;
        }

        @Override
        public void run() {
            if (!StringUtils.isEmpty(issueId) && !StringUtils.isEmpty(userId)) {
                buildTask(getJiraIssue(issueId), userId);
            }
        }
    }

    public class JiraUserTask implements Runnable {
        String userName;
        String userId;

        public JiraUserTask(String userName, String userId) {
            this.userName = userName;
            this.userId = userId;
        }

        @Override
        public void run() {
            if (!StringUtils.isEmpty(userName) && !StringUtils.isEmpty(userId)) {
                getJiraByUserName(userName).issues.forEach(o -> taskExecutor.execute(new JiraIssueTask(o.key, userId)));
            }
        }
    }
}
