package com.workshop.domain.repository;

import com.workshop.domain.entity.performance.Metric;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by bill.wang on 3/6/18
 */
public interface MetricRepository extends MongoRepository<Metric, String> {
}