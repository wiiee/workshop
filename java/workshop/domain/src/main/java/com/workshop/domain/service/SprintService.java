package com.workshop.domain.service;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.domain.service.BaseItemContainerService;
import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.constant.Phase;
import com.workshop.domain.entity.project.PhaseItem;
import com.workshop.domain.entity.project.Sprint;
import com.workshop.domain.entity.project.SprintItem;
import com.workshop.domain.entity.project.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SprintService extends BaseItemContainerService<SprintItem, Sprint> {
    @Autowired
    private TaskService taskService;

    @Autowired
    public SprintService(MongoRepository<Sprint, String> repository) {
        super(repository);
    }

    @Override
    public ServiceResult<SprintItem> addItem(String containerId, SprintItem item) {
        item.taskIds.forEach(taskId -> {
            Task task = taskService.get(taskId).data;
            task.phaseItems.add(new PhaseItem(Phase.ToDo, SecurityUtil.getUserId(), LocalDateTime.now()));
            taskService.update(task);
        });

        return super.addItem(containerId, item);
    }
}
