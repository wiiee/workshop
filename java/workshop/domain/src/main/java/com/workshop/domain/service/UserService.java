package com.workshop.domain.service;

import com.wiiee.core.domain.security.SecurityUtil;
import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.wiiee.core.platform.exception.CoreException;
import com.workshop.domain.constant.Role;
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
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService extends BaseService<User, String> implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthHelper authHelper;

    public UserService(MongoRepository<User, String> repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
    }

    public ServiceResult<User> signUp(User user) {
        if (user == null || StringUtils.isEmpty(user.getId()) || StringUtils.isEmpty(user.password)) {
            return ServiceResult.getByException(CoreException.INVALID_USERNAME_OR_PWD);
        }

        ServiceResult<User> result = get(user.getId());

        User dbUser = result.data;

        if (dbUser == null) {
            user.password = passwordEncoder.encode(user.password);
            resetRole(user);
            return super.create(user);
        } else {
            return ServiceResult.getByException(CoreException.USER_ALREADY_EXIST);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = super.get(username).data;

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        List<GrantedAuthority> authorities = authHelper.getAuthorities(username);

        return new org.springframework.security.core.userdetails.User(user.getId(), user.password, authorities);
    }

    @Override
    public ServiceResult<User> create(User entity) {
        if (entity == null || StringUtils.isEmpty(entity.getId()) || StringUtils.isEmpty(entity.password)) {
            return ServiceResult.getByException(CoreException.INVALID_USERNAME_OR_PWD);
        }

        entity.password = passwordEncoder.encode(entity.password);
        resetRole(entity);

        return super.create(entity);
    }

    //密码不改变
    @Override
    public ServiceResult<User> update(User entity) {
        if (entity == null || StringUtils.isEmpty(entity.getId())) {
            return ServiceResult.getByException(CoreException.INVALID_USERNAME_OR_PWD);
        }

        ServiceResult<User> result = super.get(entity.getId());

        if (result.isSuccessful && result.data.getId().equals(entity.getId())) {
            entity.password = result.data.password;
        }

        resetRole(entity);

        return super.update(entity);
    }

    @Override
    public ServiceResult<User> get(String id) {
        ServiceResult<User> result = super.get(id);

        if (result.isSuccessful && result.data != null) {
            result.data.password = null;
        }

        return result;
    }

    @Override
    public ServiceResult<User> get() {
        ServiceResult<User> result = super.get();

        if (result.isSuccessful && !CollectionUtils.isEmpty(result.datum)) {
            result.datum.forEach(o -> o.password = null);
        }

        return result;
    }

    //Role Admin设置校验
    private void resetRole(User user) {
        if (user.role == Role.Admin &&
                (SecurityUtil.getAuthorities() == null || !SecurityUtil.getAuthorities().contains("Admin"))) {
            user.role = Role.User;
        }
    }
}
