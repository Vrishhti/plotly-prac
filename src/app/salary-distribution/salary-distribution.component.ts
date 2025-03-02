import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js-dist-min';
import { Employee } from '../model/employee.interface';
import { FormsModule } from '@angular/forms';

PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-salary-distribution',
  templateUrl: './salary-distribution.component.html',
  styleUrls: ['./salary-distribution.component.css'],
  imports: [PlotlyModule, FormsModule],
})
export class SalaryDistributionComponent implements OnInit {
  employees: Employee[] = [];
  selectedDepartment: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  generateSalaryLineChart(): void {
    const departmentEmployees = this.employees.filter(
      (emp) => emp.department === this.selectedDepartment
    );

    const hireYears = departmentEmployees.map((emp) => emp.hireYear);
    const salaries = departmentEmployees.map((emp) => emp.salary);

    const data = [
      {
        x: hireYears,
        y: salaries,
        type: 'scatter' as const,
        mode: 'lines+markers' as const, // Correct mode type
        marker: { color: 'skyblue' },
      },
    ];

    const layout = {
      title: `Salary vs. Hire Year in ${this.selectedDepartment}`,
      xaxis: { title: 'Hire Year' },
      yaxis: { title: 'Salary' },
    };

    Plotly.newPlot('salaryLineChart', data, layout);
  }
}