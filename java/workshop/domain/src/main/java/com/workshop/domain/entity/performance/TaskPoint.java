package com.workshop.domain.entity.performance;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by bill.wang on 3/6/18
 */
public class TaskPoint extends Point {
    public String userId;

    //各个阶段花费的时间
    public Map<String, Integer> phases;

    //花费总时间
    public int duration;

//    public TaskPoint(LocalDateTime dateTime, int value, String id, String userId, Map<String, Integer> phases) {
//        super(dateTime, value, id);
//        this.userId = userId;
//        this.phases = phases;
//
//        this.total = this.phases.values().stream().mapToInt(o -> o).sum();
//    }


    public TaskPoint() {
        this.phases = new HashMap<>();
    }

    public TaskPoint(LocalDateTime dateTime, int value, String id, String userId, Map<String, Integer> phases) {
        super(dateTime, value, id);
        this.userId = userId;
        this.phases = phases;
        this.phases.forEach((k, v) -> {
            this.duration += v;
        });
    }
}
