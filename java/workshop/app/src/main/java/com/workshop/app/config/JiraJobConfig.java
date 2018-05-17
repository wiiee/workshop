package com.workshop.app.config;

import com.workshop.app.job.JiraJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JiraJobConfig {
    @Bean
    public JobDetail jiraJobDetail(){
        return JobBuilder.newJob(JiraJob.class).withIdentity("jiraJob").storeDurably().build();
    }

    @Bean
    public Trigger jiraJobTrigger() {
        SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule().withIntervalInHours(24).repeatForever();
        return TriggerBuilder.newTrigger().forJob(jiraJobDetail()).withIdentity("jiraTrigger").withSchedule(scheduleBuilder).build();
    }

}
