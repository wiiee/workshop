package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.project.Project;
import com.workshop.domain.repository.ProjectRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by bill.wang on 3/21/18
 */
@Service
public class ProjectService extends BaseService<Project, String> {
    public ProjectService(MongoRepository<Project, String> repository) {
        super(repository);
    }

    public List<Project> getByTeamId(String teamId){
        return getRepository(ProjectRepository.class).findByTeamId(teamId);
    }
}
