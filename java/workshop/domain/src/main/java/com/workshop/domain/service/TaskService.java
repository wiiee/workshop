package com.workshop.domain.service;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.exception.CoreException;
import com.workshop.domain.constant.Phase;
import com.workshop.domain.entity.performance.MetricName;
import com.workshop.domain.entity.performance.TaskPoint;
import com.workshop.domain.entity.project.PhaseItem;
import com.workshop.domain.entity.project.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class TaskService extends BaseService<Task, String> {
    @Autowired
    private MetricService metricService;

    public TaskService(MongoRepository<Task, String> repository) {
        super(repository);
    }

    @Override
    public ServiceResult<Task> create(Task entity) {
        if (entity == null) {
            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
        }

        entity.startDate = LocalDateTime.now();

        if (StringUtils.isEmpty(entity.reporterId)) {
            entity.reporterId = SecurityUtil.getUserId();
        }

        return super.create(entity);
    }

//    @Override
//    public ServiceResult<Task> update(Task entity){
//        if(entity == null){
//            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
//        }
//
//        return super.update(entity);
//    }

    public ServiceResult<Task> updatePhase(Task entity) {
        if (entity == null) {
            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
        }

        PhaseItem last = entity.phaseItems.get(entity.phaseItems.size() - 1);
        last.dateTime = LocalDateTime.now();

        return update(entity);
    }

    @Override
    public ServiceResult<Task> update(Task entity) {
        if (entity == null) {
            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
        }

        //ToDo: use queue instead in future
        //ToDo: set phase to team's last phase
        //当卡完成了，建一个点
        if (entity.isReviewed && entity.getPhase().equals(Phase.Deployed.name())) {
            metricService.addPoint(MetricName.Task.value(), new TaskPoint(entity.endDate, entity.value, entity.getId(), entity.assigneeId, entity.getDurations()));
        }

        return super.update(entity);
    }
}
