package com.workshop.app.api;

import com.workshop.domain.constant.Gender;
import com.workshop.domain.constant.Level;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wiiee on 1/31/2018.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {
    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getItems() {
        try{
            userService.create(new User(null, "123", "bill", "bill", "13424220753", null, Gender.Male, Level.T19, false));
            return userService.get();
        }
        catch (Exception ex){
            log.error(ex.getMessage());
            return new ArrayList<>();
        }
    }
}
