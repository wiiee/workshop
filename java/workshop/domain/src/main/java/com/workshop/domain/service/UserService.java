package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static java.util.Collections.emptyList;

@Service
public class UserService extends BaseService<User, String> implements UserDetailsService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(MongoRepository<User, String> repository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        super(repository, User.class);

        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public ServiceResult<User> signUp(User user) {
        if (user == null || StringUtils.isEmpty(user.getId()) || StringUtils.isEmpty(user.password)) {
            return ServiceResult.INVALID_USERNAME_OR_PWD;
        }

        ServiceResult<User> result = get(user.getId());

        User dbUser = result.data;

        if (dbUser == null) {
            user.password = bCryptPasswordEncoder.encode(user.password);
            create(user);
            return ServiceResult.SUCCESS;
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

        return new org.springframework.security.core.userdetails.User(user.getId(), user.password, emptyList());
    }
}
