package com.workshop.app.timesheet;

import com.workshop.domain.entity.project.Project;
import com.workshop.domain.entity.project.Task;
import com.workshop.domain.entity.user.Team;
import com.workshop.domain.service.ProjectService;
import com.workshop.domain.service.TaskService;
import com.workshop.domain.service.TeamService;
import org.springframework.stereotype.Component;

import java.text.DateFormatSymbols;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class TimeSheetService {
    private ProjectService projectService;
    private TaskService taskService;
    private TeamService teamService;

    private static final String SILVER_TEAM_ID = "5aaa3e7d8b23b7d0764c72d0";

    public TimeSheetService(ProjectService projectService, TaskService taskService, TeamService teamService) {
        this.projectService = projectService;
        this.taskService = taskService;
        this.teamService = teamService;
    }

    public List<TProject> buildProjects() {
        initProjects();

        List<Project> projects = updateTasks();

        return listTProjects(projects);
    }

    public List<TimeSheet> buildTimeSheets(String monday) {
        String[] parts = monday.split("/");
        LocalDateTime startDate = LocalDateTime.of(Integer.valueOf(parts[0]),
                Integer.valueOf(parts[1]),
                Integer.valueOf(parts[2]), 0, 0);

        List<TimeSheet> result = new ArrayList<>();

        Team silver = teamService.get(SILVER_TEAM_ID).data;
        List<Task> tasks = taskService.get().datum.stream()
                .filter(o -> silver.userIds.contains(o.assigneeId)).collect(Collectors.toList());

//        Project project = projectService.get().datum.stream()
//                .filter(p -> isInRange(startDate, p.startDate, p.endDate))
//                .findFirst().orElse(null);

        silver.userIds.forEach(o -> {
            for (int i = 0; i < 5; i++) {
                LocalDateTime date = startDate.plusDays(i);

                List<Task> selectedTasks = tasks.stream().filter(task -> o.equals(task.assigneeId) && isTaskInRange(task, date)).collect(Collectors.toList());

                int index = i;
                int size = selectedTasks.size();
                selectedTasks.forEach(task -> {
                    Project project = projectService.get().datum.stream().filter(p -> p.tasks.containsKey(task.getId())).findFirst().orElse(null);

                    if (project != null) {
                        TimeSheet timeSheet = result.stream().filter(r -> r.Id.equals(project.timeSheetId + "_" + o)).findFirst().orElse(null);

                        if (timeSheet == null) {
                            timeSheet = new TimeSheet();
                            timeSheet.Id = project.timeSheetId + "_" + o;
                            timeSheet.ProjectId = project.timeSheetId;
                            timeSheet.UserId = o;

                            timeSheet.WeekTimeSheets = new HashMap<>();

                            timeSheet.WeekTimeSheets.put(monday, new HashMap<>());

                            result.add(timeSheet);
                        }

                        Map<Integer, double[]> week = timeSheet.WeekTimeSheets.get(monday);

                        int taskId = project.tasks.get(task.getId());

                        if (!week.containsKey(taskId)) {
                            week.put(taskId, new double[7]);
                        }

                        week.get(taskId)[index] = Math.ceil((double)8 / size);
                    }
                });
            }
        });

        return result;
    }

    private boolean isTaskInRange(Task task, LocalDateTime dateTime) {
        if (task.phaseItems.size() > 1) {
            LocalDateTime startDate = task.phaseItems.get(1).dateTime;
            LocalDateTime endDate = task.endDate;

            if (endDate == null) {
                return dateTime.compareTo(startDate) >= 0;
            }

            return dateTime.compareTo(startDate) >= 0 && dateTime.compareTo(endDate) <= 0;
        }

        return false;
    }


    private List<TProject> listTProjects(List<Project> projects) {
        List<TProject> result = new ArrayList<>();

        projects.forEach(o -> {
            result.add(mapProject(o));
        });

        return result;
    }

    private TProject mapProject(Project project) {
        TProject result = new TProject();

        result.Id = project.timeSheetId;

        result.Name = project.name;
        result.ProjectManagerName = "Kelle";

        result.OwnerIds = new HashSet<>(Arrays.asList("G10432", "G10477"));
        result.PublishDate = project.endDate;
        result.Level = 1;
        result.SerialNumber = project.name;
        result.WorkShopId = project.getId();

        result.Tasks = new ArrayList<>();

        project.tasks.forEach((k, v) -> {
            try {
                Task t = taskService.get(k).data;
                TTask task = new TTask();
                task.Id = v;
                task.Name = t.title;
                task.UserId = t.assigneeId;
                task.Phase = "Done".equals(t.getPhase()) ? 2 : 1;
                task.PlanHour = t.value * 8;
                task.PlanDateRange = new DateRange();
                task.PlanDateRange.StartDate = t.phaseItems.get(1).dateTime;
                task.PlanDateRange.EndDate = project.endDate;
                task.Values = new HashMap<>();

                result.Tasks.add(task);
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        });

        return result;
    }


    private List<Project> updateTasks() {
        List<Project> result = new ArrayList<>();

        Team silver = teamService.get(SILVER_TEAM_ID).data;

        List<Task> tasks = taskService.get().datum.stream()
                .filter(o -> silver.userIds.contains(o.assigneeId)).collect(Collectors.toList());

        List<Project> projects = projectService.get().datum.stream()
                .filter(o -> SILVER_TEAM_ID.equals(o.teamId)).collect(Collectors.toList());

        List<String> createdTasks = projects.stream()
                .map(o -> o.tasks.keySet())
                .flatMap(o -> o.stream())
                .distinct()
                .collect(Collectors.toList());

        //未创建的task添加到project里面去
        tasks.stream().filter(o -> o.phaseItems.size() > 1 && !createdTasks.contains(o.getId())).collect(Collectors.toList()).forEach(o -> {
            Project project = projects.stream().filter(p -> isInRange(o.phaseItems.get(1).dateTime, p.startDate, p.endDate)).findFirst().orElse(null);

            if (project != null) {
                project.tasks.put(o.getId(), ++project.taskIndex);

                projectService.update(project);

                if (!result.stream().map(r -> r.getId()).collect(Collectors.toList()).contains(project.getId())) {
                    result.add(project);
                }
            }
        });

        return result;
    }

    private boolean isInRange(LocalDateTime time, LocalDateTime start, LocalDateTime end) {
        return time.compareTo(end) <= 0 && time.compareTo(start) >= 0;
    }

    private void initProjects() {
        List<Project> projects = projectService.get().datum.stream()
                .filter(o -> SILVER_TEAM_ID.equals(o.teamId)).collect(Collectors.toList());

        List<String> projectNames = projects.stream().map(o -> o.name).collect(Collectors.toList());

        for (int i = 3; i < 11; i++) {
            String month = new DateFormatSymbols().getMonths()[i];
            String name = "Silver-" + month;

            //创建好project
            if (!projectNames.contains(name)) {
                Project project = new Project();
                project.name = name;

                project.startDate = LocalDateTime.of(2018, i + 1, 1, 0, 0);
                project.endDate = LocalDateTime.of(2018, i + 2, 1, 0, 0);

                project.teamId = SILVER_TEAM_ID;

                project.tasks = new HashMap<>();

                projectService.create(project);
            }
        }
    }
}
