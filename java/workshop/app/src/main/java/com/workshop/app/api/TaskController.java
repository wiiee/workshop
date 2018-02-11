package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.service.TaskService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private static final Logger _logger = LoggerFactory.getLogger(TaskController.class);

    @Resource
    private TaskService taskService;

    @GetMapping
    public ServiceResult<Task> get(){
        return taskService.get();
    }

    @GetMapping("/{id}")
    public ServiceResult<Task> getById(@PathVariable ObjectId id){
        return taskService.get(id);
    }

    @PostMapping
    public ServiceResult<Task> create(@RequestBody Task task){
        return taskService.create(task);
    }
}
