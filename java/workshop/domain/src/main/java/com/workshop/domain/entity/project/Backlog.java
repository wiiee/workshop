package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;
import org.bson.types.ObjectId;

import java.util.Set;

//Team的backlog
public class Backlog extends BaseData<ObjectId> {
    public String Name;

    public Set<ObjectId> TaskIds;
}
