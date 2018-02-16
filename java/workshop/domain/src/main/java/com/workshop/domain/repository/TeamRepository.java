package com.workshop.domain.repository;

import com.workshop.domain.entity.user.Team;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeamRepository extends MongoRepository<Team, String> {
}
