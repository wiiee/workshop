package com.workshop.domain.repository;

import com.workshop.domain.entity.jira.Jira;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by bill.wang on 3/16/18
 */
public interface JIraRepository extends MongoRepository<Jira, String> {

}
