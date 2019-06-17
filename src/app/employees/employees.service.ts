import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Employee } from './employee.model';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient ) {}

  getEmployees() {
    this.http.get<{mesage: string, employees: any}>('http://localhost:3000/api/employees')
      .pipe(map((employeeData) => {
        return employeeData.employees.map(employee => {
          return {
            firstName: employee.firstName,
            lastName: employee.lastName,
            dob: employee.dob,
            department: employee.department,
            basicSalary: employee.basicSalary,
            designation: employee.designation,
            id: employee._id
          }
        });
      }))
    .subscribe((transformedEmployees) => {
      this.employees = transformedEmployees;
      this.employeesUpdated.next([...this.employees]);
    });
  }

  getEmployeesUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(id: string) {
    // return { ...this.employees.find(e => e.id === id )};
    return this.http.get<{ _id: string, firstName: string, lastName: string, dob: string, department: string, basicSalary: string, designation: string} >("http://localhost:3000/api/employees/" + id);
  }

  addEmployee( firstName: string, lastName: string, dob: string, department: string, basicSalary: string, designation: string ) {
    const employee: Employee = {id: null, firstName: firstName, lastName: lastName, dob: dob, department: department, basicSalary: basicSalary, designation: designation };
    this.http.post<{ message: string, employeeId: string }>('http://localhost:3000/api/employees', employee)
    .subscribe((responseData)=>{
      const id = responseData.employeeId;
      employee.id = id;
      this.employees.push(employee);
      this.employeesUpdated.next([...this.employees]);
    });
  }

  updateEmployee(id: string, firstName: string, lastName: string, dob: string, department: string, basicSalary: string, designation: string) {
    const employee: Employee = { id: id, firstName: firstName, lastName: lastName, dob: dob, department: department, basicSalary: basicSalary, designation: designation };
    this.http.put("http://localhost:3000/api/employees/" + id, employee)
    .subscribe(response => {
      const updatedEmployees = [...this.employees];
      const oldEmployeeIndex = updatedEmployees.findIndex(e => e.id === employee.id);
      updatedEmployees[oldEmployeeIndex] = employee;
      this.employees = updatedEmployees;
      this.employeesUpdated.next([...this.employees]);
    });
  }

  deleteEmployee(employeeId) {
    this.http.delete("http://localhost:3000/api/employees/" + employeeId)
    .subscribe( () => {
      console.log('Deleted');
      const updatedEmployees = this.employees.filter( employee => employee.id !== employeeId);
      this.employees = updatedEmployees;
      this.employeesUpdated.next([...this.employees]);
    })
  }
}
