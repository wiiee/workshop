import { TimeSheetService } from './../../services/timeSheet.service';
import { JiraService } from './../../services/jira.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {
  startDate: Date;

  projects: any;
  projectsText: string;
  projectIds: string;

  timeSheetText: string;

  constructor(private jiraService: JiraService, 
    private timeSheetService: TimeSheetService) { }

  ngOnInit() {
    this.timeSheetService.projects().subscribe(res => {
      this.projects = res;
      this.projectsText = JSON.stringify(res);
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Only Monday being selected.
    return day === 1;
  }

  export() {
    this.jiraService.export().subscribe();
  }

  timeSheet(): void {
    let monday: string = this.startDate.getFullYear() + "/" + 
    ("0" + (this.startDate.getMonth() + 1)).slice(-2) + "/" +
    ("0" + this.startDate.getDate()).slice(-2);
    this.timeSheetService.timeSheets(monday).subscribe(res => {
      this.timeSheetText = JSON.stringify(res);
    });
  }

  updateProjectIds(): void {
    let projectIds: string[] = Object.assign([],  JSON.parse(this.projectIds));

    this.projects.forEach(o => {
      projectIds.push(o.WorkShopId);
    });

    this.timeSheetService.updateProjectIds(projectIds).subscribe(res => console.log(res));
  }
}
