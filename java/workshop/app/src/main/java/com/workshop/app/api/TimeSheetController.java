package com.workshop.app.api;

import com.workshop.app.timesheet.TProject;
import com.workshop.app.timesheet.TimeSheet;
import com.workshop.app.timesheet.TimeSheetService;
import com.workshop.domain.entity.project.Project;
import com.workshop.domain.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/timesheet")
public class TimeSheetController {
    @Autowired
    private TimeSheetService timeSheetService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/projects")
    public List<TProject> listProjects() {
        return timeSheetService.buildProjects();
    }

    @PostMapping("/updateProjectIds")
    public void updateProjectIds(@RequestBody List<String> ids) {
        int size = ids.size();
        for (int i = 0; i < size / 2; i++) {
            int index = size - i - 1;
            Project project = projectService.get(ids.get(index)).data;

            if (project != null) {
                project.timeSheetId = ids.get(i);
                projectService.update(project);
            }
        }
    }

    @GetMapping("/timeSheets")
    public List<TimeSheet> listTimeSheets(String monday){
        return timeSheetService.buildTimeSheets(monday);
    }
}