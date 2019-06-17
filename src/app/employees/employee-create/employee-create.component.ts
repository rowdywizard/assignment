import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  public employee: Employee;

  private mode = 'create';
  private employeeId: string;

  constructor(public employeesService: EmployeesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        this.employeeId = paramMap.get('employeeId');
        this.employeesService.getEmployee(this.employeeId).subscribe( employeeData => {
          this.employee = {
            id: employeeData._id,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            dob: employeeData.dob,
            department: employeeData.department,
            basicSalary: employeeData.basicSalary,
            designation: employeeData.designation
          }
        });
      } else {
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }

  onSaveEmployee(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode === 'create'){
      this.employeesService.addEmployee(form.value.firstName, form.value.lastName, form.value.dob, form.value.department, form.value.basicSalary, form.value.designation);
    } else {
      this.employeesService.updateEmployee(this.employeeId, form.value.firstName, form.value.lastName, form.value.dob, form.value.department, form.value.basicSalary, form.value.designation);
    }

    form.resetForm();
  }
}
