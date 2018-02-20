package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.web.security.SecurityUtil;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.helper.AuthHelper;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger _logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AuthHelper authHelper;

//    @PostMapping("/logIn")
//    public ServiceResult<User> logIn(@RequestBody User user, Model model) {
//        if (user == null) {
//            return UserService.INVALID_USERNAME_OR_PWD;
//        }
//
//        ServiceResult<User> result = userService.logIn(user.getId(), user.password);
//
//        if(result.isSuccessful){
//            model.addAttribute("userId", user.getId());
//        }
//
//        return result;
//    }

    @PostMapping("/signUp")
    public ServiceResult<User> signUp(@RequestBody User user, HttpServletResponse response) {
        ServiceResult result = userService.signUp(user);

        //注册成功后自动登录
        if(result.isSuccessful){
            Authentication authentication = SecurityUtil.authenticate(user.getId(), user.password, authHelper.getAuthorities(user.getId()));
            SecurityUtil.setHeaderToken(response, authentication);
        }

        return result;
    }

    @GetMapping
    public ServiceResult<User> get() {
        return userService.get();
    }

    @GetMapping("/{id}")
    public ServiceResult<User> get(@PathVariable String id){
        return userService.get(id);
    }
}
