import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { IDynamicObject } from 'src/app/interfaces/idynamic-object';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ReportsComponent implements OnInit {
company: boolean = false;
user: boolean = false;
resourceType: boolean = false;
selectedId: boolean = false;
objectId: any;


dataSource: MatTableDataSource<Object>;
dataService: any;
rows: object[];
columns: string[];
objectProp: string[];
myControl = new FormControl();

companies: ICompany[];
users: IUser[];
types: IResourceType[];

nonPrintProps: string[] = [
  "fullName", 
  "companyId",
  "userId", 
  "resourceTypeId", 
  "vehicleId", 
  "useTicketId", 
  "ticketT", 
  "itemT", 
  "compT",
  "requestT",
  "userT",
  "vehicleT",
  "resourceTypeT",
  "uvT"
];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private companyService: CompanyService,
    private itemService: ItemService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private vehicleService: VehicleService,
    private rtService: ResourcetypeService,
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {

    // })
  }

  fetchSource(object: string) {
    
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

  
  createDataSource(type: string) {
    if(type == 'tickets' && this.company) {
      this.dataService = this.companyService.getTicketsbyCompany(this.objectId);
    } else {
      this.dataService = this.userService.getTicketsByUser(this.objectId);
    }

    if(type == 'requests' && this.company) {
      this.dataService = this.companyService.getRequestsByCompany(this.objectId);
    } else {
      this.dataService = this.userService.getRequestsByUser(this.objectId);
    }

    if(type == 'items' && this.company) {
      this.dataService = this.itemService.getAllItems(this.objectId);
    } else {
      this.dataService = this.rtService.getItemsByResourceType(this.objectId);
    }

    if(!this.fetchData()) {
      this.dataAlert();
    }

    this.dataSource = new MatTableDataSource<Object>(this.rows);
  }

  fetchData(): boolean  {
    let objArr = [];
    this.dataService.subscribe(data => {
      data.forEach(dataObject => {
         this.removeProps(dataObject) //remove unwanted properties from displaying
        objArr.push(dataObject);
        this.rows = objArr;
      })
    });
    return true;
  }

  removeProps(dataObject: object): Object {
    for (var key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        for (var i = 0; i < this.nonPrintProps.length; i++) {
          if (key == this.nonPrintProps[i]) {
            delete dataObject[key];
          }
        }
      }
    }
    return dataObject;
  } 

  dataAlert() {
    alert("Could not process request for data.");
  }

GenerateColumns() {
  console.log(this.rows[0]);
    this.columns = Object.keys(this.rows[0]);
  }

  clearDataTableandView() {
    this.company = false;
    this.user = false;
    this.resourceType = false;
    this.selectedId = false;
    this.rows.length = 0;
    this.columns.length = 0;
    this.dataSource = new MatTableDataSource<Object>(this.rows);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

