package com.workshop.app.api;

import com.workshop.domain.entity.performance.Metric;
import com.workshop.domain.entity.performance.MetricName;
import com.workshop.domain.entity.performance.Point;
import com.workshop.domain.entity.performance.TaskPoint;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.MetricService;
import com.workshop.domain.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
        Metric metric = getService().get(MetricName.Task.value()).data;
        return metric.points.stream()
                .filter(o -> ((TaskPoint)o).userId.equals(userId))
                .sorted(Comparator.comparing(p -> p.dateTime))
                .collect(Collectors.toList());
    }

    //Team下的所有成员
    @GetMapping("/team/{teamId}")
    public List<Point> getByTeamId(@PathVariable String teamId) {
        Team team = teamService.getTeam(teamId);

        Metric metric = getService().get(MetricName.Task.value()).data;
        return metric.points.stream()
                .filter(o -> team.userIds.contains(((TaskPoint)o).userId))
                .sorted(Comparator.comparing(p -> p.dateTime))
                .collect(Collectors.toList());
    }

//    //Manager下的所有成员
//    @GetMapping("/manager/user/{managerId}")
//    public Map<String, List<Point>> getUsersByManagerId(@PathVariable String managerId) {
//        Map<String, List<Point>> result = new HashMap<>();
//
//        for (int i = 0; i < 50; i++) {
//            List<Point> points = new ArrayList<>();
//
//            for (int j = 0; j < 100; j++) {
//                points.add(generateTaskPoint(j, ""));
//            }
//
//            result.put(String.valueOf(i), points);
//        }
//
//        return result;
//    }

//    //Manager下的所有团队
//    @GetMapping("/manager/team/{managerId}")
//    public Map<String, List<Point>> getTeamsByManagerId(@PathVariable String managerId) {
//        Map<String, List<Point>> result = new HashMap<>();
//
//        for (int i = 0; i < 5; i++) {
//            List<Point> points = new ArrayList<>();
//
//            for (int j = 0; j < 100; j++) {
//                points.add(generateTaskPoint(j, ""));
//            }
//
//            result.put(String.valueOf(i), points);
//        }
//
//        return result;
//    }

//    private TaskPoint generateTaskPoint(int j, String userId) {
//        ThreadLocalRandom random = ThreadLocalRandom.current();
//        LocalDateTime now = LocalDateTime.now();
//
//        Map<String, Integer> phases = new HashMap<>();
//        EnumUtils.getEnumList(Phase.class).forEach(o -> {
//            phases.put(o.name(), random.nextInt(1, 1000));
//        });
//
//        return new TaskPoint(now.minusSeconds(random.nextLong(1, 100000000)), random.nextInt(1, 100), String.valueOf(j), userId, phases);
//    }

}
