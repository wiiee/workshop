package com.workshop.domain.entity.user;

import com.wiiee.core.platform.data.BaseData;

import java.util.Set;

public class Team extends BaseData<String> {
    //Id为团队Id

    public String name;
    public Set<String> ownerIds;
    public Set<String> userIds;

    public String parentId;

    public Team(String id, String name, Set<String> ownerIds, Set<String> userIds, String parentId) {
        super(id);
        this.name = name;
        this.userIds = userIds;
        this.ownerIds = ownerIds;
        this.parentId = parentId;
    }
}
