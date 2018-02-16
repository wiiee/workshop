package com.workshop.domain.service;

import com.wiiee.core.platform.util.DateUtil;
import com.workshop.domain.entity.performance.Performance;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Math.round;
import static java.lang.Math.toIntExact;

@Component
public class PerformanceService {
    @Autowired
    private TaskService taskService;

    //ToDo: 如果要更精确点，value可以根据时间取百分比
    public Performance calculatePerformance(LocalDateTime startDate, LocalDateTime endDate, String userId){
        List<Task> tasks = taskService.getRepository(TaskRepository.class).findByAssigneeId(userId);

        tasks = tasks.stream()
                .filter(o -> o.isReviewed
                        && DateUtil.isIntersect(startDate, endDate, o.startDate, o.endDate))
                .collect(Collectors.toList());

        double duration = tasks.stream().mapToInt(o -> toIntExact(Duration.between(o.startDate, o.endDate).getSeconds())).average().orElse(0);

        return new Performance(
                tasks.stream().mapToInt(o -> o.value).sum(),
                (int)round(duration));
    }
}
