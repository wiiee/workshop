package com.workshop.domain.exception;

import com.wiiee.core.platform.exception.BaseException;
import com.wiiee.core.platform.exception.MyException;

public abstract class WorkshopException implements BaseException {
    //1051 ~ 1100 Universal Error
    public static final MyException EXCEPTION_INVALID_DATA = new MyException(1051, "Invalid data, please check it.");

    //1101 ~ 1200 User Service Error

    //1201 ~ 1300 Team Service Error

    //1301 ~ 1400 Task Service Error

}
