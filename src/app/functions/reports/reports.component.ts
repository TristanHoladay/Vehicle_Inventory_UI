import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable, MatFormField, MatSortModule, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { ItemService } from 'src/app/services/item.service';
import { UseticketService } from 'src/app/services/useticket.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { IUser } from 'src/app/interfaces/iuser';
import { IResourceType } from 'src/app/interfaces/resource-type';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
company: boolean = false;
user: boolean = false;
resourceType: boolean = false;
selectedId: boolean = false;
objectId: any;

companies: ICompany[];
users: IUser[];
types: IResourceType[];

  //data source equals the data presented after user decides what data they want

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private itemService: ItemService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private vehicleService: VehicleService,
    private rtService: ResourcetypeService
  ) { }

  ngOnInit() {
  }

  fetchData(object: string) {
    console.log(object);
    if(object == "company") {
      this.getCompanies();
      this.company = true;
    }

    if(object == "user") {
      this.getUsers();
      this.user = true;
    }

    if(object == "resourcetype") {
      this.getTypes();
      this.resourceType = true;
    }
  }

  catchId(id: any) {
    this.objectId = id;
    this.selectedId = true;
  }

  getCompanies() {
    this.companyService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  getTypes() {
    this.rtService.getAllResourceTypes().subscribe(data => {
      this.types = data;
    })
  }

  
  createDataSource() {
    
    }



}
