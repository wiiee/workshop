package com.workshop.domain.helper;

import com.workshop.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class AuthHelper {
    @Autowired
    private UserService userService;

    public List<GrantedAuthority> getAuthorities(String id){
        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(userService.get(id).data.role.name()));
        //List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(String.valueOf(teamService.getHeight(id))));
        return authorities;
    }
}
