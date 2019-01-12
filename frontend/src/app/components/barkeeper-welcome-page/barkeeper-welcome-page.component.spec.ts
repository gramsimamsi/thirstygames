import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarkeeperWelcomePageComponent } from './barkeeper-welcome-page.component';

describe('BarkeeperWelcomePageComponent', () => {
  let component: BarkeeperWelcomePageComponent;
  let fixture: ComponentFixture<BarkeeperWelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarkeeperWelcomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarkeeperWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
