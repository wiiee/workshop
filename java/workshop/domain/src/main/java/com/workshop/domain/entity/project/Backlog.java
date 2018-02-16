package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;

import java.util.Set;

//Team的backlog
public class Backlog extends BaseData<String> {
    public String name;

    public Set<String> taskIds;
}
