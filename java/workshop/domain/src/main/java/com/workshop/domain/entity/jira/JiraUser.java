package com.workshop.domain.entity.jira;

import java.util.List;

/**
 * Created by billwang on 3/16/18
 */
public class JiraUser {
    public String expand;
    public int total;
    public List<Issue> issues;
}
