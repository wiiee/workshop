package com.workshop.app.job;

import com.workshop.domain.service.JiraService;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class JiraJob extends QuartzJobBean {
    @Autowired
    private JiraService jiraService;

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        System.out.println("Start Jira Job: " + LocalDateTime.now());
        jiraService.exportTasks();
    }
}
