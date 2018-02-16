package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.project.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService extends BaseService<Task, String> {
    @Autowired
    public TaskService(MongoRepository<Task, String> repository) {
        super(repository, Task.class);
    }
}
