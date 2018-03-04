package com.workshop.app.api;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.platform.exception.MyException;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.TeamService;
import javafx.util.Pair;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/team")
public class TeamController extends BaseController<String, Team, TeamService> {
    public TeamController(TeamService service) {
        super(service);
    }

    @GetMapping("/teamPairs")
    public List<Pair<String, String>> getTeams() {
        return getService().get().datum.stream()
                .map(o -> new Pair<>(o.getId(), o.name)).collect(Collectors.toList());
    }

    @GetMapping("/teamId/{userId}")
    public String getTeamId(@PathVariable String userId) {
        try {
            if(StringUtils.isEmpty(userId)){
                userId = SecurityUtil.getUserId();
            }

            return getService().getTeamId(userId);
        } catch (MyException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
