import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDistributionComponent } from './salary-distribution.component';

describe('SalaryDistributionComponent', () => {
  let component: SalaryDistributionComponent;
  let fixture: ComponentFixture<SalaryDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
