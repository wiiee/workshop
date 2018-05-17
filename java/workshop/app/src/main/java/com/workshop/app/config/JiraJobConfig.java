package com.workshop.app.config;

import com.workshop.app.job.JiraJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class JiraJobConfig {
    @Bean
    public JobDetail jiraJobDetail(){
        return JobBuilder.newJob(JiraJob.class).withIdentity("jiraJob").build();
    }

    @Bean
    public Trigger jiraJobTrigger() {
        SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule().withIntervalInHours(24).repeatForever();
        return TriggerBuilder.newTrigger().forJob(jiraJobDetail()).withIdentity("jiraTrigger").withSchedule(scheduleBuilder).build();
    }

}
