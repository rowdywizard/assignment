import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'create', component: EmployeeCreateComponent },
  { path: 'edit/:employeeId', component: EmployeeCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
