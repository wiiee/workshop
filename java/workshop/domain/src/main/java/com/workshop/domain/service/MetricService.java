package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.platform.log.LoggerFacade;
import com.wiiee.core.platform.log.other.OtherLogEntry;
import com.wiiee.core.platform.log.other.OtherLogEntryPool;
import com.workshop.domain.entity.performance.Metric;
import com.workshop.domain.entity.performance.Point;
import com.workshop.domain.exception.WorkshopException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.stream.Collectors;

/**
 * Created by bill.wang on 3/6/18
 */
@Service
public class MetricService extends BaseService<Metric, String> {
    @Autowired
    private LoggerFacade loggerFacade;

    @Autowired
    private OtherLogEntryPool otherLogEntryPool;

    public MetricService(MongoRepository<Metric, String> repository) {
        super(repository);
    }

    public void addPoint(String id, Point point) {
        if (StringUtils.isEmpty(id) || point == null) {
            return;
        }

        Metric metric = get(id).data;

        if (metric == null) {
            metric = new Metric(id);
        }

        //该结果没有加过
        if (!metric.points.stream().map(o -> o.id).collect(Collectors.toList()).contains(point.id)) {
            metric.points.add(point);
        }
        //记录异常
        else {
            OtherLogEntry entry = otherLogEntryPool.allocate().build(WorkshopException.METRIC_DUPLICATE, point);
            loggerFacade.log(entry, otherLogEntryPool);
        }

        update(metric);
    }
}
