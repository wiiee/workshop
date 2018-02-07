package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger _logger = LoggerFactory.getLogger(EnumController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/logIn")
    public ServiceResult logIn(@RequestBody User user){
        if(user == null){
            return UserService.INVALID_USERNAME_OR_PWD;
        }

        return userService.logIn(user.getId(), user.password);
    }

    @PostMapping("/signUp")
    public ServiceResult signUp(@RequestBody User user){
        return userService.signUp(user);
    }

    @GetMapping
    public ServiceResult get(){
        return userService.get();
    }
}
