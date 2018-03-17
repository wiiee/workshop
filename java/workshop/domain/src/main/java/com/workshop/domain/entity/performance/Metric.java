package com.workshop.domain.entity.performance;

import com.wiiee.core.platform.data.BaseData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by bill.wang on 3/6/18
 */
public class Metric extends BaseData<String> {
    //Id为name

    public Metric() {
        this.points = new ArrayList<>();
    }

    public Metric(String id) {
        super(id);

        this.points = new ArrayList<>();
    }

    public List<Point> points;
}