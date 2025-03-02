import { Routes } from '@angular/router';
import { SalaryDistributionComponent } from './salary-distribution/salary-distribution.component';
import { AgeDemographicsComponent } from './age-demographics/age-demographics.component';
import { LocationDistributionComponent } from './location-distribution/location-distribution.component';

export const routes: Routes = [
    { path: 'salary', component: SalaryDistributionComponent },
    { path: 'age', component: AgeDemographicsComponent },
    { path: 'location', component: LocationDistributionComponent },
    { path: '', redirectTo: '/salary', pathMatch: 'full' }
];
