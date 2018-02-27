package com.workshop.app.api;

import com.workshop.domain.entity.project.Task;
import com.workshop.domain.service.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task")
public class TaskController extends BaseController<String, Task, TaskService> {
    public TaskController(TaskService service) {
        super(service);
    }
}
