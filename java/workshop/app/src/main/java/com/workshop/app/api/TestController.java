package com.workshop.app.api;

import com.workshop.domain.constant.Phase;
import com.workshop.domain.entity.jira.IssueInfo;
import com.workshop.domain.entity.jira.JiraUser;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.service.JiraService;
import com.workshop.domain.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by bill.wang on 3/16/18
 */
@RestController
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    private JiraService jiraService;

    @Autowired
    private TaskService taskService;

    @GetMapping
    public String test() {
        List<Task> tasks = taskService.get().datum;

        tasks.forEach(o -> {
            if (Phase.Deployed.name().equals(o.getPhase())) {
                o.isReviewed = true;
                o.endDate = o.phaseItems.get(o.phaseItems.size() - 1).dateTime;
                taskService.update(o);
            }
        });
        //jiraService.exportTasks();
        return "done";
    }

    @GetMapping("/user")
    public JiraUser test1() {
        return jiraService.getJiraByUserName("brucewu");
    }

    @GetMapping("/users")
    public List<IssueInfo> test2() {
        return jiraService.getJiraIssuesByUserName("brucewu");
    }

}
