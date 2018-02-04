package com.workshop.app.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wiiee on 2/4/2018.
 */
@RestController
@RequestMapping("/api/enum")
public class EnumController {
    private static final Logger log = LoggerFactory.getLogger(EnumController.class);

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    public boolean getOptions(@PathVariable String name) {

        return false;
    }
}
