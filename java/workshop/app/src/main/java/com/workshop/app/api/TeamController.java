package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.TeamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/team")
public class TeamController {
    private static final Logger _logger = LoggerFactory.getLogger(TeamController.class);

    @Autowired
    private TeamService teamService;

    @GetMapping
    public ServiceResult<Team> get(){
        return teamService.get();
    }

    @GetMapping("/{id}")
    public ServiceResult<Team> get(@PathVariable String id){
        return teamService.get(id);
    }

    @PostMapping
    public ServiceResult<Team> create(@RequestBody Team team){
        return teamService.create(team);
    }
}
