package com.workshop.domain.repository;

import com.workshop.domain.entity.user.Team;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeamRepository extends MongoRepository<Team, ObjectId> {
}
