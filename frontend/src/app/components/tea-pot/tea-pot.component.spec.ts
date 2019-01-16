import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaPotComponent } from './tea-pot.component';

describe('TeaPotComponent', () => {
  let component: TeaPotComponent;
  let fixture: ComponentFixture<TeaPotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaPotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
