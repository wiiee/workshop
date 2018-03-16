package com.workshop.domain.entity.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wiiee.core.platform.data.BaseData;
import javafx.util.Pair;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    //ToDo:
    @JsonIgnore
    public List<Pair<String, Integer>> getDurations() {
        return new ArrayList<>();
    }
}
