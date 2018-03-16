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
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Created by bill.wang on 3/16/18
 */
@Component
public class JiraService extends BaseService<Jira, String> {
    private final RestTemplate restTemplate;
    private final TaskService taskService;

    private final Map<String, String> users;
    private static final String SILVER_TEAM_ID = "5aaa3e7d8b23b7d0764c72d0";

    public JiraService(MongoRepository<Jira, String> repository, RestTemplate restTemplate, TaskService taskService) {
        super(repository);

        this.restTemplate = restTemplate;
        this.taskService = taskService;

        users = new HashMap<>();
        users.put("ethanye", "G10485");
        users.put("horisonhuang", "G11084");
        users.put("brucewu", "G10459");
        users.put("lucianyu", "G11086");
        users.put("sherlockliu", "G11826");
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

    private void buildTask(IssueInfo info, String userId) {
        try{
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
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    private void buildPhases(IssueInfo info, Task task) {
        List<PhaseItem> phases = new ArrayList<>();

        info.changelog.histories.forEach(o -> {
            for (Item item : o.items) {
                System.out.println(String.format("item: %s", GsonUtil.toJson(item)));
                if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.equals("Analysis")) {
                    phases.add(new PhaseItem(Phase.Analysis.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("in progress")) {
                    phases.add(new PhaseItem(Phase.InProgress.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("waiting for review")) {
                    phases.add(new PhaseItem(Phase.Reviewing.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("waiting for customer")) {
                    phases.add(new PhaseItem(Phase.Blocked.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.equals("Done")) {
                    phases.add(new PhaseItem(Phase.Deployed.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("status") && item.fieldtype.equals("jira") && item.toString.toLowerCase().equals("ready for deployment")) {
                    phases.add(new PhaseItem(Phase.Deployed.name(), getUserId(o.author.name), convertFromString(o.created)));
                }
                else if (item.field.equals("Story Points") && item.fieldtype.equals("custom")) {
                    try{
                        task.value = Integer.parseInt(item.toString);
                    }
                    catch (Exception ex){
                        task.value = 0;
                    }
                }
            }
        });

        task.phaseItems = phases;
    }
    
    private String getUserId(String userName){
        return users.get(userName);
    }

    private LocalDateTime convertFromString(String created){
        return LocalDateTime.parse(created.substring(0, created.length() - 5));
    }

    // 导出数据到Task数据库里面
    public void exportTasks() {
        users.forEach((k, v) -> {
            getJiraIssuesByUserName(k).forEach(o -> {
                buildTask(o, v);
            });
        });
    }
}
