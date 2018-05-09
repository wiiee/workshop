package com.workshop.app.api;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.platform.model.KeyValuePair;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.TeamService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/team")
public class TeamController extends BaseController<String, Team, TeamService> {
    public TeamController(TeamService service) {
        super(service);
    }

    @GetMapping("/teamPairs")
    public List<KeyValuePair> getTeams() {
        return getService().get().datum.stream()
                .map(o -> new KeyValuePair(o.getId(), o.name)).collect(Collectors.toList());
    }

    @GetMapping("/user/{userId}")
    public Team getTeamByUserId(@PathVariable String userId) {
        if (StringUtils.isEmpty(userId)) {
            userId = SecurityUtil.getUserId();
        }

        return getService().getTeamByUserId(userId);
    }

    @GetMapping("/phases/{teamId}")
    public List<String> getPhases(@PathVariable String teamId) {
        return getService().getPhases(teamId);
    }
}
