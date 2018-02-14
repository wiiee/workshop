package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by wiiee on 1/31/2018.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {
    private static final Logger _logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getItems() {
        ServiceResult<User> result = userService.get();
        return result.datum;
    }
}
