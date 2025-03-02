(window as any).global = window;

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { PlotlyModule } from 'angular-plotly.js';
import { importProvidersFrom } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
PlotlyModule.plotlyjs = Plotly;

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Use defined routes
    PlotlyModule, // ✅ Provide PlotlyModule
    { provide: PlotlyModule, useValue: Plotly },
    provideHttpClient() // ✅ Provide Plotly instance
  ]
}).catch(err => console.error(err));
