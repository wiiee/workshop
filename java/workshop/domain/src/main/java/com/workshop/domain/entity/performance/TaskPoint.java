package com.workshop.domain.entity.performance;

import javafx.util.Pair;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by bill.wang on 3/6/18
 */
public class TaskPoint extends Point {
    public String userId;

    //各个阶段花费的时间
    public List<Pair<String, Integer>> phases;

    //花费总时间
    public int duration;

//    public TaskPoint(LocalDateTime dateTime, int value, String id, String userId, Map<String, Integer> phases) {
//        super(dateTime, value, id);
//        this.userId = userId;
//        this.phases = phases;
//
//        this.total = this.phases.values().stream().mapToInt(o -> o).sum();
//    }


    public TaskPoint(LocalDateTime dateTime, int value, String id, String userId, List<Pair<String, Integer>> phases) {
        super(dateTime, value, id);
        this.userId = userId;
        this.phases = phases;
        this.duration = this.phases.stream().mapToInt(o -> o.getValue()).sum();
    }
}
