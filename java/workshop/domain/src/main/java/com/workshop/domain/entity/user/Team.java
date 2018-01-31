package com.workshop.domain.entity.user;

import com.wiiee.core.platform.data.BaseData;
import org.bson.types.ObjectId;

import java.util.Set;

public class Team extends BaseData<ObjectId> {
    public String Name;
    public Set<String> UserIds;
    public Set<String> OwnerIds;

    public String ParentId;

    public Team(ObjectId id, String name, Set<String> userIds, Set<String> ownerIds, String parentId) {
        super(id);
        Name = name;
        UserIds = userIds;
        OwnerIds = ownerIds;
        ParentId = parentId;
    }
}
