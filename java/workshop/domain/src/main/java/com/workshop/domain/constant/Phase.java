package com.workshop.domain.constant;

public enum Phase {
    ToDo,
    InProgress,
    //被阻塞
    Blocked,
    //代码Review中
    Reviewing,
    //完成，发布到生产中
    Deployed,
    //监控完毕
    Done
}
