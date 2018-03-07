package com.workshop.domain.entity.performance;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by bill.wang on 3/6/18
 */
//返回给前端的点阵
public class PointList {
    private List<Point> points;

    public PointList(List<Point> points) {
        this.points = points;
    }

    public int getTotal() {
        return points.stream().mapToInt(o -> o.value).sum();
    }

    public int getAverage() {
        return (int) Math.round(points.stream().mapToInt(o -> o.value).average().orElse(0));
    }

    public List<Point> getPoints() {
        return points.stream().distinct().sorted((p1, p2) -> Long.compare(p1.timeStamp, p2.timeStamp)).collect(Collectors.toList());
    }
}
