package com.workshop.domain.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wiiee.core.platform.data.BaseData;
import com.workshop.domain.constant.Gender;
import com.workshop.domain.constant.Level;
import com.workshop.domain.constant.Role;

import java.util.List;

public class User extends BaseData<String> {
    //Id为工号

    public String password;

    public String name;
    public String nickName;
    public String mobileNo;
    public List<String> pics;

    public Gender gender;
    public Level level;
    public Role role;

    //是否离职
    public boolean isOff;

    public String jiraUserName;

    @JsonIgnore
    public String getDisplayName(){
        return String.format("%s(%s)", nickName, name);
    }

    public User() {
    }

    public User(String id, String name, String password, String nickName, Gender gender, Level level, Role role, boolean isOff, String jiraUserName) {
        super(id);
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.mobileNo = "";
        this.pics = null;
        this.gender = gender;
        this.level = level;
        this.role = role;
        this.isOff = isOff;
        this.jiraUserName = jiraUserName;
    }
}
