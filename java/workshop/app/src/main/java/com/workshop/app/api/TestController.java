package com.workshop.app.api;

import com.workshop.domain.constant.Gender;
import com.workshop.domain.constant.Level;
import com.workshop.domain.constant.Phase;
import com.workshop.domain.constant.Role;
import com.workshop.domain.entity.jira.IssueInfo;
import com.workshop.domain.entity.jira.JiraUser;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.service.JiraService;
import com.workshop.domain.service.TaskService;
import com.workshop.domain.service.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping
    public String test() {
        jiraService.exportTasks();
        return "done";
    }

    @GetMapping("/test1")
    public void test1() {
        List<Task> tasks = taskService.get().datum;

        tasks.forEach(o -> {
            if (Phase.Done.name().equals(o.getPhase())) {
                o.isReviewed = true;
                taskService.update(o);
            }
        });
    }

    @GetMapping("/users")
    public String test2() {
//        return jiraService.getJiraIssuesByUserName("brucewu");


//        User user = new User("G11093", "黄亮", "123", "Bright", Gender.Male, Level.T17, Role.Leader, false, "brighthuang");
//        userService.create(user);
//
//        user = new User("G10736", "代作雄", "123", "Dawson", Gender.Male, Level.T17, Role.User, false, "dawsondai");
//        userService.create(user);
//
//        user = new User("G11962", "李圆琳", "123", "Josie", Gender.Female, Level.T17, Role.User, false, "josieli");
//        userService.create(user);
//
//        user = new User("G11429", "苏灿灏", "123", "Such", Gender.Male, Level.T17, Role.User, false, "suchsu");
//        userService.create(user);
//
//        user = new User("G11378", "庄亦欣", "123", "Johnson", Gender.Male, Level.T17, Role.User, false, "johnsonzhuang");
//        userService.create(user);
//
//        user = new User("G10494", "黄丹波", "123", "Bird", Gender.Male, Level.T17, Role.User, false, "birdhuang");
//        userService.create(user);
//
//        user = new User("G11072", "杨秦旭", "123", "Young", Gender.Male, Level.T17, Role.User, false, "youngyang");
//        userService.create(user);
//
//        user = new User("G10488", "林德强", "123", "Nathan", Gender.Male, Level.T17, Role.Leader, false, "nathanlin");
//        userService.create(user);
//
//        user = new User("G11414", "卓新苗", "123", "Yuki", Gender.Female, Level.T17, Role.User, false, "yukizhuo");
//        userService.create(user);
//
//        user = new User("S45779", "代旋", "123", "Acton", Gender.Male, Level.T17, Role.User, false, "actondai");
//        userService.create(user);
//
//        user = new User("G10516", "芦玥", "123", "Monica", Gender.Female, Level.T17, Role.User, false, "monicalu");
//        userService.create(user);
//
//        user = new User("G11641", "戴竞纬", "123", "Felix", Gender.Male, Level.T17, Role.User, false, "felixdai");
//        userService.create(user);
//
//        user = new User("G11241", "梁国", "123", "Lingo", Gender.Male, Level.T17, Role.User, false, "lingoliang");
//        userService.create(user);

        return "done";
    }

}
