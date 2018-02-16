package com.workshop.domain.entity.project;

import com.wiiee.core.platform.data.BaseData;
import com.wiiee.core.platform.util.date.DateRange;

import java.util.Set;

public class SprintItem extends BaseData<String> {
    public String name;
    public DateRange dateRange;

    public Set<String> taskIds;
}
