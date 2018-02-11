package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/user")
@SessionAttributes("userId")
public class UserController {
    private static final Logger _logger = LoggerFactory.getLogger(UserController.class);

    @Resource
    private UserService userService;

    @PostMapping("/logIn")
    public ServiceResult<User> logIn(@RequestBody User user, Model model) {
        if (user == null) {
            return UserService.INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = userService.logIn(user.getId(), user.password);

        if(result.isSuccessful){
            model.addAttribute("userId", user.getId());
        }

        return result;
    }

    @PostMapping("/signUp")
    public ServiceResult<User> signUp(@RequestBody User user, Model model) {
        ServiceResult<User> result = userService.signUp(user);

        if(result.isSuccessful){
            model.addAttribute("userId", user.getId());
        }

        return result;
    }

    @GetMapping
    public ServiceResult<User> get() {
        return userService.get();
    }
}
