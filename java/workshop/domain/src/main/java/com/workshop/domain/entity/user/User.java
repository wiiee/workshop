package com.workshop.domain.entity.user;

import com.wiiee.core.platform.data.BaseData;
import com.workshop.domain.constant.Gender;
import com.workshop.domain.constant.Level;

import java.util.List;

public class User extends BaseData<String> {
    //Id为工号

    public String Password;

    public String Name;
    public String NickName;
    public String MobileNo;
    public List<String> Pics;

    public Gender Gender;
    public Level Level;

    //是否离职
    public boolean IsOff;

    public User(String id, String password, String name, String nickName, String mobileNo, List<String> pics, Gender gender, Level level, boolean isOff) {
        super(id);
        Password = password;
        Name = name;
        NickName = nickName;
        MobileNo = mobileNo;
        Pics = pics;
        Gender = gender;
        Level = level;
        IsOff = isOff;
    }
}
