package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Task extends BaseData<String> {
    //开始结束时间
    public LocalDateTime startDate;
    public LocalDateTime endDate;

    //Task的创建者、工作者
    public String reporterId;
    public String assigneeId;

    //标题和描述
    public String title;
    public String description;

    //分值，类似于story point
    public int value;

    //哪个Team的
    public String teamId;

    //评论
    public List<Comment> comments;

    //代码提交信息
    public List<Code> codes;

    //是否被Review过
    public boolean isReviewed;

    public List<PhaseItem> phaseItems;

    public Task(){}

    public Task(String id, String reporterId, String title, String description) {
        super(id);
        this.startDate = LocalDateTime.now();
        this.reporterId = reporterId;
        this.title = title;
        this.description = description;
        this.phaseItems = new ArrayList<>();
    }
}
