import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { identity } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmpcurdOperations';
  Employee: any[] = [];
  employee:any={empno:'',empname:'',salary:''};
  newEmployee: any = { empno: identity, empname: '', salary: '' };
  isEditing = false;

  constructor(private Emps: EmployeeService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.Emps.getEmp().subscribe((data:any)=>{
this.Employee=data;
console.log(data);
    });
  }

  editEmployee(employee: any) {
    this.employee = { ...employee };
    this.isEditing = true;
  }

  updateEmployee() {
    this.Emps.updateEmp(this.employee.empno, this.employee).subscribe(
      () => {
        Swal.fire('Record updated', 'Record updated successfully', 'success');
        this.fetchData();
        this.resetForm();
      }
     
    );
  }

  addEmployee() {
    if (this.newEmployee.empname && this.newEmployee.salary) {
      this.Emps.insertemp(this.newEmployee).subscribe(
        () => {
          Swal.fire('Record inserted', 'Record inserted successfully', 'success');
          this.newEmployee={empno:identity,empname:'',salary:''};
          this.fetchData();
          this.resetForm();
        }
      );
    }
  }

  DeleteEmp(id: any): void {
    this.Emps.deleteEmp(id).subscribe(
      () => {
        Swal.fire('Record deleted', 'Record deleted successfully', 'success');
        this.fetchData();
      }
     
    );
  }

  resetForm() {
    this.employee = { Empno: '', Empname: '', Salary: '' };
    this.isEditing = false;
  }}
