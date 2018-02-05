package com.workshop.app.api;

import javafx.util.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wiiee on 2/4/2018.
 */
@RestController
@RequestMapping("/api/enum")
public class EnumController {
    private static final Logger log = LoggerFactory.getLogger(EnumController.class);

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    public List<Pair<String, Object>> getOptions(@PathVariable String name) {
        List<Pair<String, Object>> pairs = new ArrayList<>();
        
        return pairs;
    }
}
