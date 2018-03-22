package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;

import java.util.Set;

/**
 * Created by bill.wang on 3/21/18
 */
public class Project extends BaseData<String> {
    public String name;
    public Set<String> taskIds;
    public String teamId;
}
