package com.workshop.domain.entity.performance;

//绩效
public class Performance {
    //总分值，类似于story point
    public int value;

    //Task从开始到结束的时长，以秒为单位，平均时长
    public int duration;

    public Performance(){}

    public Performance(int value, int duration) {
        this.value = value;
        this.duration = duration;
    }
}