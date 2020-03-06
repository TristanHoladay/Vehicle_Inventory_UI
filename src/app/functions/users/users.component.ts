import {Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatInputModule } from '@angular/material';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  Users: IUser[] = [];
  show: boolean = false;
  

  addUser: IUser = {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    adminRole: null,
    email: "",
    password: "",
    jobDescription: "",
    userT: null
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.Users = data;
    });
  }

  addData(newData) {
    this.Users.push(newData);
  }

  updtData(updatedData) {
   let upData = this.Users.find(ud => ud.id == updatedData.id) 
     upData.firstName = updatedData.firstName;
     upData.lastName = updatedData.lastName;
     upData.fullName = updatedData.fullName;
     upData.jobDescription = updatedData.jobDescription;
     upData.adminRole = updatedData.adminRole;
     upData.email = updatedData.email;
  }

  showContent() {
    this.show = true;
  }

  adminConvertToString(user: IUser): string {
    if(user.adminRole == false) {
      return "User";
    } else {
      return "Admin";
    }
  }

}
