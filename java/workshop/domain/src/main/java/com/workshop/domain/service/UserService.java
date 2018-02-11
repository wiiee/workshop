package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class UserService extends BaseService<User, String> {
    public static ServiceResult<User> INVALID_USERNAME = new ServiceResult<>("Id is invalid, please check it.");
    public static ServiceResult<User> INVALID_PWD = new ServiceResult<>("Password is invalid, please check it.");
    public static ServiceResult<User> INVALID_USERNAME_OR_PWD = new ServiceResult<>("Id or password is invalid, please check it.");
    public static ServiceResult<User> USER_ALREADY_EXIST = new ServiceResult<>("User is already exist.");

    @Autowired
    public UserService(MongoRepository<User, String> repository) {
        super(repository, User.class);
    }

    public ServiceResult<User> logIn(String id, String password) {
        if (StringUtils.isEmpty(id) || StringUtils.isEmpty(password)) {
            return INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = get(id);

        User user = result.data;

        if (user == null) {
            return INVALID_USERNAME;
        } else {
            if (user.password.equals(password)) {
                return ServiceResult.SUCCESS;
            } else {
                return INVALID_PWD;
            }
        }
    }

    public ServiceResult<User> signUp(User user) {
        if (user == null || StringUtils.isEmpty(user.getId()) || StringUtils.isEmpty(user.password)) {
            return INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = get(user.getId());

        User dbUser = result.data;

        if (dbUser == null) {
            create(user);
            return ServiceResult.SUCCESS;
        } else {
            return USER_ALREADY_EXIST;
        }
    }
}
