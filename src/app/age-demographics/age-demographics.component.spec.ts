import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDemographicsComponent } from './age-demographics.component';

describe('AgeDemographicsComponent', () => {
  let component: AgeDemographicsComponent;
  let fixture: ComponentFixture<AgeDemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeDemographicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
