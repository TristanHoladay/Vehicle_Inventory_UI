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
  type: any;

  constructor(
    private userService: UserService<IUser>
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.Users = data;
    });
  }

}
