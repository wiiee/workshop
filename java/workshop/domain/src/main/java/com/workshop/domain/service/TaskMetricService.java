package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.performance.TaskMetric;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

/**
 * Created by bill.wang on 3/6/18
 */
@Service
public class TaskMetricService extends BaseService<TaskMetric, String> {
    public TaskMetricService(MongoRepository<TaskMetric, String> repository) {
        super(repository);
    }
}
