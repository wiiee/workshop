package com.workshop.domain.entity.performance;

import com.wiiee.core.platform.data.BaseData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by bill.wang on 3/6/18
 */
public class TaskMetric extends BaseData<String> {
    //Id为name

    public Point point;

    public TaskMetric() {

    }

    public TaskMetric(String id, Point point) {
        super(id);
        this.point = point;
    }
}