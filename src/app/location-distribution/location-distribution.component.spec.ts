import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDistributionComponent } from './location-distribution.component';

describe('LocationDistributionComponent', () => {
  let component: LocationDistributionComponent;
  let fixture: ComponentFixture<LocationDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
