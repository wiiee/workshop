package com.workshop.domain.service;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.exception.CoreException;
import com.workshop.domain.entity.project.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
public class TaskService extends BaseService<Task, String> {
    public TaskService(MongoRepository<Task, String> repository) {
        super(repository);
    }

    @Override
    public ServiceResult<Task> create(Task entity){
        if(entity == null){
            return ServiceResult.getByException(CoreException.EXCEPTION_NULL_PARAMETERS);
        }

        entity.startDate = LocalDateTime.now();

        if(StringUtils.isEmpty(entity.reporterId)){
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
}
