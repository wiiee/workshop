import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMessageComponent } from './header-message.component';

describe('HeaderMessageComponent', () => {
  let component: HeaderMessageComponent;
  let fixture: ComponentFixture<HeaderMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
