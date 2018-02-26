package com.workshop.app.api;

import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.TeamService;
import javafx.util.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/team")
public class TeamController extends BaseController<String, Team, TeamService> {
    private static final Logger _logger = LoggerFactory.getLogger(TeamController.class);

    public TeamController(TeamService service) {
        super(service);
    }

    @GetMapping("/teamPairs")
    public List<Pair<String, String>> getTeams() {
        return getService().get().datum.stream()
                .map(o -> new Pair<>(o.getId(), o.name)).collect(Collectors.toList());
    }
}
