package com.workshop.domain.entity.project;

import com.wiiee.core.domain.valuetype.DateRange;
import com.wiiee.core.platform.data.BaseData;
import org.bson.types.ObjectId;

import java.util.Set;

public class SprintItem extends BaseData<String> {
    public String Name;
    public DateRange DateRange;

    public Set<ObjectId> TaskIds;
}
