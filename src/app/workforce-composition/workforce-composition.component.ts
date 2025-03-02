import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js-dist-min';
import { AfterViewInit } from '@angular/core';
import { PieData, Layout } from 'plotly.js';
import { Employee } from '../model/employee.interface';
PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.component.html',
  styleUrls: ['./workforce.component.css'],
  imports: [PlotlyModule],
})
export class WorkforceComponent implements AfterViewInit {
  employees: Employee[] = [];
  genderData: any;
  deptData: any;

  constructor(private employeeService: EmployeeService) {}

  ngAfterViewInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => { // Type data
      this.employees = data;
      console.log('Employee Data:', this.employees);

      setTimeout(() => { 
        if (document.getElementById('genderPieChart')) {
          this.createGenderPieChart();
        } else {
          console.error('genderPieChart div is missing!');
        }

        // if (document.getElementById('departmentBarChart')) {
        //   this.createDepartmentBarChart();
        // } else {
        //   console.error('departmentBarChart div is missing!');
        // }
      }, 0); // Ensures DOM is fully loaded before running Plotly
    });
  }

  createGenderPieChart(): void {
    const genderCounts: { [key: string]: number } = this.employees.reduce(
      (acc: { [key: string]: number }, emp: Employee) => {
        acc[emp.gender] = (acc[emp.gender] || 0) + 1;
        return acc;
      },
      {}
    );
  
    const data: Partial<PieData>[] = [  // ✅ Use Partial<PieData>[] instead of generic object
      {
        labels: Object.keys(genderCounts),
        values: Object.values(genderCounts),
        type: 'pie' as const,  // ✅ Explicitly cast 'type' as 'pie'
      },
    ];
  
    const layout: Partial<Layout> = { title: 'Gender Distribution' };
    // console.log(document.getElementById('genderPieChart')); // Should not be null

    Plotly.newPlot('genderPieChart', data, layout);
  }

//   createDepartmentBarChart(): void {
//     const deptCounts: { [key: string]: number } = this.employees.reduce(
//       (acc: { [key: string]: number }, emp: Employee) => {
//         acc[emp.department] = (acc[emp.department] || 0) + 1;
//         return acc;
//       },
//       {}
//     );

//     const data: Partial<PieData>[]= [
//       {
//         labels: Object.keys(deptCounts),
//         values: Object.values(deptCounts),
//         type: 'pie', // Correct type for bar chart
//       },
//     ];

//     Plotly.newPlot('departmentBarChart', data);
//   }
 }