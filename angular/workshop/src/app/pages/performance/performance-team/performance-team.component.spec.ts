import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTeamComponent } from './performance-team.component';

describe('PerformanceTeamComponent', () => {
  let component: PerformanceTeamComponent;
  let fixture: ComponentFixture<PerformanceTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
