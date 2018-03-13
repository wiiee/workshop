package com.workshop.app.api;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.data.BaseData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public abstract class BaseController<Id extends Serializable, T extends BaseData<Id>, S extends BaseService<T, Id>> {
    private static final Logger _logger = LoggerFactory.getLogger(BaseController.class);

    private S service;

    public BaseController(S service) {
        this.service = service;
    }

    public S getService() {
        return service;
    }

    @GetMapping
    public ServiceResult<T> get() {
        return service.get();
    }

    @GetMapping("/{id}")
    public ServiceResult<T> get(@PathVariable Id id) {
        return service.get(id);
    }

    @PostMapping("/items")
    public ServiceResult<T> getByIds(@RequestBody Collection<Id> ids){
        return service.getByIds(ids);
    }

    @PostMapping
    public ServiceResult<T> post(@RequestBody T entity) {
        return service.update(entity);
    }

    @PutMapping
    public ServiceResult<T> put(@RequestBody T entity) {
        return service.create(entity);
    }

    @DeleteMapping("/{id}")
    public ServiceResult<T> delete(@PathVariable Id id) {
        return service.delete(id);
    }
}
