package com.workshop.domain.service;

import com.wiiee.core.domain.service.BaseService;
import com.wiiee.core.domain.service.ServiceResult;
import com.workshop.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService extends BaseService<User, String> implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private TeamService teamService;

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

        List<GrantedAuthority> authorities = getAuthorities(username);

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

    private List<GrantedAuthority> getAuthorities(String id){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(teamService.getHeight(id))));

        return authorities;
    }
}
