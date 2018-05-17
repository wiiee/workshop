package com.workshop.domain.repository;

import com.workshop.domain.entity.performance.TaskMetric;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by bill.wang on 3/6/18
 */
public interface TaskMetricRepository extends MongoRepository<TaskMetric, String> {
}