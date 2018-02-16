package com.workshop.domain.repository;

import com.workshop.domain.entity.project.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByAssigneeId(String assigneeId);
}
