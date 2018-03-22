package com.workshop.domain.repository;

import com.workshop.domain.entity.project.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by bill.wang on 3/21/18
 */
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByTeamId(String teamId);
}

