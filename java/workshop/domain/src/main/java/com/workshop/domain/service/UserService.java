package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.workshop.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public class UserService extends BaseService<User, String> {
    @Autowired
    public UserService(MongoRepository<User, String> repository) {
        super(repository, User.class);
    }
}
