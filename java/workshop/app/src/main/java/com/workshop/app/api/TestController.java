package com.workshop.app.api;

import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.TeamService;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by wiiee on 1/31/2018.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {
    private static final Logger _logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Team> getItems() {
//        Set<String> ownerIds = new HashSet<>(Arrays.asList("Michael"));
//        Set<String> userIds = new HashSet<>(Arrays.asList("a", "b", "c", "d"));
//        Team team = new Team("flight", "flight", ownerIds, userIds, null);
//        teamService.create(team);
//
//        List<String> names = new ArrayList<>(Arrays.asList("a", "b", "c", "d"));
//
//        names.forEach(o -> {
//            ownerIds.clear();
//            ownerIds.add(o);
//
//            userIds.clear();
//            for(int i = 1; i < 5; i++){
//                userIds.add(o + i);
//            }
//
//            team.setId(o);
//            team.name = o;
//            team.ownerIds = ownerIds;
//            team.userIds = userIds;
//            team.parentId = "flight";
//
//            teamService.create(team);
//        });
        System.out.println("a->a1: " + teamService.isBoss("a", "a1"));
        System.out.println("a->a2: " + teamService.isBoss("a", "a2"));
        System.out.println("a->a3: " + teamService.isBoss("a", "a3"));
        System.out.println("a->a4: " + teamService.isBoss("a", "a4"));
        System.out.println("a1->a: " + teamService.isBoss("a1", "a"));
        System.out.println("a->b: " + teamService.isBoss("a", "b"));
        System.out.println("b->a: " + teamService.isBoss("b", "a"));
        System.out.println("Michael->a1: " + teamService.isBoss("Michael", "a1"));
        System.out.println("a1->Michael: " + teamService.isBoss("a1", "Michael"));
        System.out.println("a->Michael: " + teamService.isBoss("a", "Michael"));
        System.out.println("Michael->a: " + teamService.isBoss("Michael", "a"));

        return teamService.get().datum;
    }

    @PostMapping
    public String hello(@RequestBody String name) throws Exception {
        return "hello, world " + name;
    }
}
