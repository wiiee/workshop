package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Created by bill.wang on 3/21/18
 */
public class Project extends BaseData<String> {
    //Id为string

    public int taskIndex;

    //TimeSheet里面的projectId
    public String timeSheetId;

    public String name;

    //key为workshop id, value为project task Id
    public Map<String, Integer> tasks;

    public LocalDateTime startDate;
    public LocalDateTime endDate;

    public int status;

    public String teamId;


}
