import { Observable } from 'rxjs';
import { Api } from './api';
import { Injectable } from '@angular/core';

@Injectable()
export class TimeSheetService {
  constructor(private api: Api) {
  }

  projects(): Observable<any> {
    return this.api.get("/api/timesheet/projects");
  }

  updateProjectIds(ids: string[]): Observable<any> {
    return this.api.post("/api/timesheet/updateProjectIds", ids);
  }

  timeSheets(monday: string): Observable<any> {
      return this.api.get("/api/timesheet/timeSheets?monday=" + monday);
  }
}