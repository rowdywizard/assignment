import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private employeesSub: Subscription;

  constructor(public employeesService: EmployeesService ) {}

  ngOnInit() {
    this.employeesService.getEmployees();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener().
    subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  onDelete(employeeId: string){
    this.employeesService.deleteEmployee(employeeId);
  }

  ngOnDestroy() {
    this.employeesSub.unsubscribe();
  }
}
