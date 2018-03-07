package com.workshop.app.api;

import com.workshop.domain.entity.performance.*;
import com.workshop.domain.service.MetricService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by bill.wang on 3/7/18
 */
@RestController
@RequestMapping("/api/metric")
public class MetricController extends BaseController<String, Metric, MetricService> {
    public MetricController(MetricService service) {
        super(service);
    }

    @GetMapping("/user/{userId}")
    public PointList getByUserId(@PathVariable String userId) {
        Metric metric = getService().get(MetricName.Value.value()).data;
        List<Point> result = new ArrayList<>();

        metric.points.forEach(o -> {
            if (o instanceof TaskPoint) {
                TaskPoint point = (TaskPoint) o;

                if (point.userId.equals(userId)) {
                    result.add(point);
                }
            }
        });

        return new PointList(result);
    }

    @GetMapping("/team/{teamId}")
    public Map<String, PointList> getByTeamId(@PathVariable String teamId) {
        return null;
    }
}
