package com.workshop.app.api;

import com.wiiee.core.domain.service.BaseItemContainerService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.data.BaseData;
import com.wiiee.core.platform.data.BaseItemContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

/**
 * Created by bill.wang on 3/3/18
 */
public abstract class BaseItemContainerController<T2 extends BaseData<String>, T1 extends BaseItemContainer<T2>, S extends BaseItemContainerService<T2, T1>> {
    private static final Logger _logger = LoggerFactory.getLogger(BaseItemContainerController.class);

    private S service;

    public BaseItemContainerController(S service) {
        this.service = service;
    }

    public S getService() {
        return service;
    }

    @GetMapping("/{containerId}")
    public ServiceResult<T2> getItems(@PathVariable String containerId) {
        return service.getItems(containerId);
    }

    @GetMapping("/item/{itemId}")
    public ServiceResult<T2> getItem(@PathVariable String itemId) {
        return service.getByItemId(itemId);
    }

    @PutMapping("/item/{containerId}")
    public ServiceResult<T2> putItem(@PathVariable String containerId, @RequestBody T2 item) {
        return service.addItem(containerId, item);
    }

    @PostMapping("/item")
    public ServiceResult<T2> updateItem(@RequestBody T2 item) {
        return service.updateItem(item);
    }

    @DeleteMapping("/item")
    public ServiceResult<T2> deleteItem(@RequestBody String itemId) {
        return service.deleteItem(itemId);
    }
}
