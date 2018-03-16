package com.workshop.domain.entity.jira;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by bill.wang on 3/16/18
 */
public class History {
    public String id;
    public Author author;
    //public LocalDateTime created;
    public String created;
    public List<Item> items;
}
