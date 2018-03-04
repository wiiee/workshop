package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseItemContainerService;
import com.workshop.domain.entity.project.Sprint;
import com.workshop.domain.entity.project.SprintItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class SprintService extends BaseItemContainerService<SprintItem, Sprint> {
    @Autowired
    public SprintService(MongoRepository<Sprint, String> repository) {
        super(repository);
    }
}
