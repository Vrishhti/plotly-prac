import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js-dist-min';
import { Employee } from '../model/employee.interface';
import { CommonModule } from '@angular/common';
PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-age-demographics',
  templateUrl: './age-demographics.component.html',
  styleUrls: ['./age-demographics.component.css'],
  imports: [PlotlyModule, CommonModule],
})
export class AgeDemographicsComponent implements OnInit {
  employees: Employee[] = [];
  showGenderPieChart = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.createAgeBarChart();
    });
  }

  createAgeBarChart(): void {
    const data = [
      {
        x: this.employees.map((emp) => emp.name),
        y: this.employees.map((emp) => emp.age),
        type: 'bar' as const,
        marker: {
          color: 'skyblue',
        },
      },
    ];

    const layout = {
      title: 'Employee Age Demographics',
      xaxis: { title: 'Employee Name' },
      yaxis: { title: 'Age' },
      transition: {
        duration: 500,
        easing: 'cubic-in-out' as const,
      },
    };

    Plotly.newPlot('ageBarChart', data, layout);
  }

  toggleGenderPieChart(): void {
    this.showGenderPieChart = !this.showGenderPieChart;
    if (this.showGenderPieChart) {
      setTimeout(() => {
        this.createGenderPieChart();
      });
    } else {
      setTimeout(() => {
        this.createAgeBarChart();
      });
    }
  }

  createGenderPieChart(): void {
    const genderPieChartElement = document.getElementById('genderPieChart');
    if (genderPieChartElement) {
      const genderCounts: { [key: string]: number } = this.employees.reduce(
        (acc: { [key: string]: number }, emp: Employee) => {
          acc[emp.gender] = (acc[emp.gender] || 0) + 1;
          return acc;
        },
        {}
      );

      const data = [
        {
          labels: Object.keys(genderCounts),
          values: Object.values(genderCounts),
          type: 'pie' as const,
        },
      ];

      const layout = {
        title: 'Gender Distribution',
      };

      Plotly.newPlot('genderPieChart', data, layout);
    }
  }
}