package com.workshop.app.job;

import com.workshop.domain.service.JiraService;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
public class JiraJob extends QuartzJobBean {
    private JiraService jiraService;

    public JiraJob(JiraService jiraService) {
        this.jiraService = jiraService;
    }

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        jiraService.exportTasks();
    }
}
