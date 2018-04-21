package com.workshop.app.api;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.web.security.WebSecurityUtil;
import com.workshop.domain.constant.Role;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.helper.AuthHelper;
import com.workshop.domain.service.TeamService;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.AbstractMap;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController<String, User, UserService> {
    private static final Logger _logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AuthHelper authHelper;

    @Autowired
    private TeamService teamService;

    public UserController(UserService service) {
        super(service);
    }

    @PostMapping("/signUp")
    public ServiceResult<User> signUp(@RequestBody User user, HttpServletResponse response) {
        ServiceResult result = getService().signUp(user);

        //注册成功后自动登录
        if (result.isSuccessful) {
            Authentication authentication = SecurityUtil.authenticate(user.getId(), user.password, authHelper.getAuthorities(user.getId()));
            WebSecurityUtil.setHeaderToken(response, authentication);
        }

        return result;
    }

    @GetMapping("/ownerPairs")
    public List<Map.Entry<String, String>> getOwners() {
        return getService().get().datum.stream()
                .filter(o -> o.role.value() > 0)
                .map(o -> new AbstractMap.SimpleEntry<>(o.getId(), o.getDisplayName())).collect(Collectors.toList());
    }

    @GetMapping("/userPairs")
    public List<Map.Entry<String, String>> getUsers() {
        return getService().get().datum.stream()
                .filter(o -> !o.isOff && o.role != Role.Admin)
                .map(o -> new AbstractMap.SimpleEntry<>(o.getId(), o.getDisplayName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/userPairs/{teamId}")
    public List<Map.Entry<String, String>> getTeamUsers(@PathVariable String teamId) {
        Collection<String> userIds = teamService.get(teamId).data.userIds;
        return getService().getByIds(userIds).datum.stream()
                .filter(o -> !o.isOff && o.role != Role.Admin)
                .map(o -> new AbstractMap.SimpleEntry<>(o.getId(), o.getDisplayName()))
                .collect(Collectors.toList());
    }

    @Override
    @GetMapping
    public ServiceResult<User> get() {
        ServiceResult<User> result = getService().get();

        //排除掉Admin和离职人员
        List<String> authorities = SecurityUtil.getAuthorities();
        if (authorities != null && !authorities.contains(Role.Admin.toString())) {
            result.datum.stream().filter(o -> o.role != Role.Admin && o.isOff).collect(Collectors.toList());
        }

        return result;
    }
}
