import {Component, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'jobDescription', 'adminRole'];
  

  constructor() { }

  ngOnInit() {
  }

}
