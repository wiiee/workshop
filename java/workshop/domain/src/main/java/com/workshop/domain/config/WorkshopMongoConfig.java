package com.workshop.domain.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        basePackages = "com.workshop.domain.repository",
        mongoTemplateRef = "workshopMongoTemplate")
public class WorkshopMongoConfig extends AbstractMongoConfiguration {
    private MongoProperties mongoProperties;

    @Autowired
    public WorkshopMongoConfig(MongoProperties mongoProperties) {
        this.mongoProperties = mongoProperties;
    }

    @Override
    protected String getDatabaseName() {
        return "workshop";
    }

    @Override
    public Mongo mongo() {
        return new MongoClient(new MongoClientURI(mongoProperties.determineUri()));
    }

    @Bean
    public MongoTemplate workshopMongoTemplate() {
        return new MongoTemplate(mongo(), getDatabaseName());
    }
}
