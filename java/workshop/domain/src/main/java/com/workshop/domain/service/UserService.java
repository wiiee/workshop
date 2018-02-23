package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import com.workshop.domain.helper.AuthHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService extends BaseService<User, String> implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthHelper authHelper;

    public UserService(MongoRepository<User, String> repository, PasswordEncoder passwordEncoder) {
        super(repository, User.class);
        this.passwordEncoder = passwordEncoder;
    }

    public ServiceResult<User> signUp(User user) {
        if (user == null || StringUtils.isEmpty(user.getId()) || StringUtils.isEmpty(user.password)) {
            return ServiceResult.INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = get(user.getId());

        User dbUser = result.data;

        if (dbUser == null) {
            user.password = passwordEncoder.encode(user.password);
            return super.create(user);
        } else {
            return ServiceResult.USER_ALREADY_EXIST;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = get(username).data;

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        List<GrantedAuthority> authorities = authHelper.getAuthorities(username);

        return new org.springframework.security.core.userdetails.User(user.getId(), user.password, authorities);
    }

    @Override
    public ServiceResult<User> create(User entity){
        if (entity == null || StringUtils.isEmpty(entity.getId()) || StringUtils.isEmpty(entity.password)) {
            return ServiceResult.INVALID_USERNAME_OR_PWD;
        }

        entity.password = passwordEncoder.encode(entity.password);
        return super.create(entity);
    }

    //密码不改变
    @Override
    public ServiceResult<User> update(User entity){
        if (entity == null || StringUtils.isEmpty(entity.getId())) {
            //ToDo: define exception
            return ServiceResult.INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = get(entity.getId());

        if(result.isSuccessful && result.data.getId().equals(entity.getId())){
            entity.password = result.data.password;
        }

        return super.update(entity);
    }
}
