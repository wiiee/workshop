package com.workshop.domain.entity.performance;

/**
 * Created by bill.wang on 3/6/18
 */
public enum MetricName {
    //任务产生的价值
    Value("task.value"),
    //任务花费的时间，以秒为单位
    Duration("task.duration"),
    //任务block的时间，以秒为单位
    BlockDuration("task.block.duration"),
    //任务花费的block以外的时间，以秒为单位
    DurationExceptBlock("task.except.block.duration");

    private String value;

    MetricName(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
