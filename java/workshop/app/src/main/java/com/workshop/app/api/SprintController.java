package com.workshop.app.api;

import com.workshop.domain.entity.project.Sprint;
import com.workshop.domain.service.SprintService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by bill.wang on 2/26/18
 */
@RestController
@RequestMapping("/api/sprint")
public class SprintController extends BaseController<String, Sprint, SprintService> {
    public SprintController(SprintService service) {
        super(service);
    }
}