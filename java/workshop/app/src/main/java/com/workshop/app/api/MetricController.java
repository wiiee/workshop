package com.workshop.app.api;

import com.workshop.domain.constant.Phase;
import com.workshop.domain.entity.performance.Metric;
import com.workshop.domain.entity.performance.Point;
import com.workshop.domain.entity.performance.TaskPoint;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.MetricService;
import com.workshop.domain.service.TeamService;
import javafx.util.Pair;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Created by bill.wang on 3/7/18
 */
@RestController
@RequestMapping("/api/metric")
public class MetricController extends BaseController<String, Metric, MetricService> {
    @Autowired
    private TeamService teamService;

    public MetricController(MetricService service) {
        super(service);
    }

    //单个成员
    @GetMapping("/user/{userId}")
    public List<Point> getByUserId(@PathVariable String userId) {
//        Metric metric = getService().get(MetricName.Value.value()).data;
//        List<Point> result = new ArrayList<>();
//
//        metric.points.forEach(o -> {
//            if (o instanceof TaskPoint) {
//                TaskPoint point = (TaskPoint) o;
//
//                if (point.userId.equals(userId)) {
//                    result.add(point);
//                }
//            }
//        });
//
//        return new PointList(result);

        List<Point> result = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            result.add(generateTaskPoint(i, "G1"));
        }

        return result;
    }

    //Team下的所有成员
    @GetMapping("/team/{teamId}")
    public List<Point> getByTeamId(@PathVariable String teamId) {
        List<Point> result = new ArrayList<>();

        Team team = teamService.getTeam(teamId);

        String[] users = team.userIds.toArray(new String[team.userIds.size()]);

        for (int i = 0; i < 100; i++) {
            result.add(generateTaskPoint(i, users[i % team.userIds.size()]));
        }

        result.sort(Comparator.comparing(p -> p.dateTime));

        return result;
    }

    //Manager下的所有成员
    @GetMapping("/manager/user/{managerId}")
    public Map<String, List<Point>> getUsersByManagerId(@PathVariable String managerId) {
        Map<String, List<Point>> result = new HashMap<>();

        for (int i = 0; i < 50; i++) {
            List<Point> points = new ArrayList<>();

            for (int j = 0; j < 100; j++) {
                points.add(generateTaskPoint(j, ""));
            }

            result.put(String.valueOf(i), points);
        }

        return result;
    }

    //Manager下的所有团队
    @GetMapping("/manager/team/{managerId}")
    public Map<String, List<Point>> getTeamsByManagerId(@PathVariable String managerId) {
        Map<String, List<Point>> result = new HashMap<>();

        for (int i = 0; i < 5; i++) {
            List<Point> points = new ArrayList<>();

            for (int j = 0; j < 100; j++) {
                points.add(generateTaskPoint(j, ""));
            }

            result.put(String.valueOf(i), points);
        }

        return result;
    }

    private TaskPoint generateTaskPoint(int j, String userId) {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        LocalDateTime now = LocalDateTime.now();

        List<Pair<String, Integer>> phases = new ArrayList<>();
        EnumUtils.getEnumList(Phase.class).forEach(o -> {
            phases.add(new Pair<>(o.name(), random.nextInt(1, 1000)));
        });

        return new TaskPoint(now.minusSeconds(random.nextLong(1, 100000000)), random.nextInt(1, 100), String.valueOf(j), userId, phases);
    }

}
