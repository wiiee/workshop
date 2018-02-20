package com.workshop.domain.helper;

import com.workshop.domain.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AuthHelper {
    @Autowired
    private TeamService teamService;

    public List<GrantedAuthority> getAuthorities(String id){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(teamService.getHeight(id))));

        return authorities;
    }
}
