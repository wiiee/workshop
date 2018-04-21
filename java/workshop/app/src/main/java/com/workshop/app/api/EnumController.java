package com.workshop.app.api;

import com.wiiee.core.platform.util.EnumUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by wiiee on 2/4/2018.
 */
@RestController
@RequestMapping("/api/enum")
public class EnumController {
    private static final Logger _logger = LoggerFactory.getLogger(EnumController.class);

    @GetMapping("/{name:.+}")
    public List<Map.Entry<String, Object>> getOptions(@PathVariable String name) {
        return EnumUtil.getOptions(name);
    }
}
