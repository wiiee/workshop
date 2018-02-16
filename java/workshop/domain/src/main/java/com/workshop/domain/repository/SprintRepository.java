package com.workshop.domain.repository;

import com.workshop.domain.entity.project.Sprint;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SprintRepository extends MongoRepository<Sprint, String> {
}
