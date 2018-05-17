package com.workshop.domain.entity.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wiiee.core.platform.data.BaseData;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class Task extends BaseData<String> {
    //Id为jiraId

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

    //Tags
    public Set<String> tags;

    //是否被Review过
    public boolean isReviewed;

    public List<PhaseItem> phaseItems;

    public Task() {
        this.phaseItems = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.codes = new ArrayList<>();
        this.tags = new HashSet<>();
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

    public String getPhase() {
        if (CollectionUtils.isEmpty(phaseItems)) {
            return null;
        }

        return phaseItems.get(phaseItems.size() - 1).phase;
    }

    //获取各个阶段耗费的时间
    @JsonIgnore
    public Map<String, Integer> getDurations() {
        Map<String, Integer> result = new HashMap<>();

        for (int i = 0; i < phaseItems.size() - 1; i++) {
            result.put(phaseItems.get(i).phase, getDuration(i));
        }

        return result;
    }

    private int getDuration(int i) {
        return (int) phaseItems.get(i).dateTime.until(phaseItems.get(i + 1).dateTime, ChronoUnit.MINUTES);
    }
}
