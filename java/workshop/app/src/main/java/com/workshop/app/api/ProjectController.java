package com.workshop.app.api;

import com.workshop.domain.entity.project.Project;
import com.workshop.domain.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by bill.wang on 3/21/18
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController extends BaseController<String, Project, ProjectService> {
    public ProjectController(ProjectService service) {
        super(service);
    }

    @GetMapping("/team/{teamId}")
    public List<Project> getByTeamId(@PathVariable String teamId){
        return getService().getByTeamId(teamId);
    }
}
