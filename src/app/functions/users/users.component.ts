import {Component, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatInputModule } from '@angular/material';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: IUser[] = [];
  oneUser: IUser;
  addUser: IUser = {
    id: "iijf8878",
    firstName: "Francis",
    lastName: "Peterson",
    fullName: "Francis Peterson",
    adminRole: true,
    email: "francis@peterson.com",
    password: "Password123!",
    jobDescription: "get stuff done",
    userT: null
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.Users = data;
    });

    this.userService.getUserById("42a0c497-2f2c-4420-bef9-09d098c3651d").subscribe(data => {
      this.oneUser = data;
      console.log(this.oneUser.id + " " + this.oneUser.fullName);
    });

     this.userService.addUser(this.addUser).subscribe(data => {
       console.log(data);
    });
  }


  updateUser(id: string, user: IUser) {
    user.firstName = "TESTING UPDATE FROM FRONT END";
    this.userService.updateUser(id, user).subscribe(data => {
      console.log(data);
    });
  }

  deleteUser(id: string) {
    this.userService.delete(id).subscribe(data => {
      console.log(data);
    });
  }

}
