package com.workshop.domain.entity.jira;

import java.util.List;

/**
 * Created by bill.wang on 3/16/18
 */
public class ChangeLog {
    public int startAt;
    public int maxResults;
    public int total;

    public List<History> histories;
}
