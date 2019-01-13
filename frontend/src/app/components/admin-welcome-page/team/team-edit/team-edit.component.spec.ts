import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditComponent } from './team-edit.component';

describe('TeamEditComponent', () => {
  let component: TeamEditComponent;
  let fixture: ComponentFixture<TeamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
