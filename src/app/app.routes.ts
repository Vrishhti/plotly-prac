import { Routes } from '@angular/router';
import { WorkforceComponent } from './workforce-composition/workforce-composition.component';
import { AgeDemographicsComponent } from './age-demographics/age-demographics.component';
import { LocationDistributionComponent } from './location-distribution/location-distribution.component';

export const routes: Routes = [
    { path: 'workforce', component: WorkforceComponent },
    { path: 'age', component: AgeDemographicsComponent },
    { path: 'location', component: LocationDistributionComponent },
    { path: '', redirectTo: '/workforce', pathMatch: 'full' }
];
