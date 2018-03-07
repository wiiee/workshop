package com.workshop.domain.entity.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wiiee.core.platform.data.BaseData;
import com.workshop.domain.constant.Phase;
import org.springframework.util.CollectionUtils;

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

    public Task() {
        this.phaseItems = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.codes = new ArrayList<>();
        this.startDate = LocalDateTime.now();
    }

//    public Task(String id, String reporterId, String title, String description) {
//        super(id);
//        this.startDate = LocalDateTime.now();
//        this.reporterId = reporterId;
//        this.title = title;
//        this.description = description;
//        this.phaseItems = new ArrayList<>();
//    }

    public Phase getPhase() {
        if (CollectionUtils.isEmpty(phaseItems)) {
            return null;
        }

        return phaseItems.get(phaseItems.size() - 1).phase;
    }

    @JsonIgnore
    public int getDuration() {
        return 0;
    }

    @JsonIgnore
    public int getBlockDuration() {
        return 0;
    }

    @JsonIgnore
    public int getDurationExceptBlock() {
        return 0;
    }
}
