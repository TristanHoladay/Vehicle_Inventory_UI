import {Component, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatInputModule } from '@angular/material';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'jobDescription', 'adminRole'];
  dataSource: MatTableDataSource<IUser>;
  myControl = new FormControl();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource<IUser>(data);
    });
  }

}
