import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceUserComponent } from './performance-user.component';

describe('PerformanceUserComponent', () => {
  let component: PerformanceUserComponent;
  let fixture: ComponentFixture<PerformanceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
