package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.project.Sprint;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class SprintService extends BaseService<Sprint, String> {
    @Autowired
    public SprintService(MongoRepository<Sprint, String> repository) {
        super(repository, Sprint.class);
    }
}
