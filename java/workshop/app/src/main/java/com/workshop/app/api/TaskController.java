package com.workshop.app.api;

import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.model.KeyValuePair;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.service.TaskService;
import com.workshop.domain.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/task")
public class TaskController extends BaseController<String, Task, TaskService> {
    @Autowired
    private TeamService teamService;

    public TaskController(TaskService service) {
        super(service);
    }

    @GetMapping("/taskPairs/{teamId}")
    public List<KeyValuePair> getTaskPairs(@PathVariable String teamId) {
//        try {
//            String searchTeamId = teamId == null ? teamService.getTeamId(SecurityUtil.getUserId()) : teamId;
//            return getService().get().datum.stream()
//                    .filter(o -> o.teamId.equals(searchTeamId))
//                    .map(o -> new Pair<>(o.getId(), o.title)).collect(Collectors.toList());
//        } catch (MyException e) {
//            return null;
//        }
        return getService().get().datum.stream()
                .map(o -> new KeyValuePair(o.getId(), o.title))
                .collect(Collectors.toList());
    }

    @PostMapping("/updatePhase")
    public ServiceResult<Task> updatePhase(@RequestBody Task task){
        return getService().updatePhase(task);
    }
}
