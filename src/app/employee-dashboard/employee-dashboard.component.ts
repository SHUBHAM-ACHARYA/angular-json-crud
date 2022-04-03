import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/apii.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;

  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    console.log(this.employeeModelObj);
    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('employee added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
}
