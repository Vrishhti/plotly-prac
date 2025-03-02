import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlotlyModule } from 'angular-plotly.js';
import { ScatterData, Layout } from 'plotly.js';
import { EmployeeService } from '../employee.service';
import * as Plotly from 'plotly.js-dist-min';
PlotlyModule.plotlyjs = Plotly;

@Component({
    selector: 'app-location-distribution',
    standalone: true,
    imports: [PlotlyModule],
    templateUrl: './location-distribution.component.html',
})
export class LocationDistributionComponent implements OnInit {
    employees: any[] = [];
    locationChart: any = { data: [], layout: {} };

    constructor(private employeeService: EmployeeService) {}

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe((data: any[]) => {
            this.employees = data;
            this.createLocationLineChart();
        });
    }

    createLocationLineChart(): void {
        const locationCounts: Record<string, number> = this.employees.reduce(
            (acc: Record<string, number>, emp: any) => {
                acc[emp.location] = (acc[emp.location] || 0) + 1;
                return acc;
            }, 
            {}
        );

        const data: Partial<ScatterData>[] = [
            {
                x: Object.keys(locationCounts),
                y: Object.values(locationCounts),
                mode: 'lines+markers',  // ✅ Correct mode for line chart
                type: 'scatter' as const,  // ✅ Correct type
            }
        ];

        const layout: Partial<Layout> = {
            title: 'Employee Distribution by Location',
            xaxis: { title: 'Location' },
            yaxis: { title: 'Count' }
        };

        Plotly.newPlot('locationLineChart', data, layout);
    }
}
