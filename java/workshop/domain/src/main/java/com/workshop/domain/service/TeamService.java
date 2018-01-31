package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.user.Team;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

public class TeamService extends BaseService<Team, ObjectId> {
    @Autowired
    public TeamService(MongoRepository<Team, ObjectId> repository) {
        super(repository);
    }
}
