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

  //Get list of selected data sources
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

  //Get id of dataSource object to later pass to observable
  catchId(id: any) {
    this.objectId = id;
    this.selectedId = true;
  }
  
  //Get Service that matches selected parameters
  defineDataService(type: string) {
    switch(type) {

      case("tickets") :
        if(this.company) {
          this.dataService = this.companyService.getTicketsbyCompany(this.objectId);
          console.log(this.dataService.toString());
        } else {
          this.dataService = this.userService.getTicketsByUser(this.objectId);
        }
        break;
      
      case("requests") :
        if(this.company) {
          this.dataService = this.companyService.getRequestsByCompany(this.objectId);
        } else {
          this.dataService = this.userService.getRequestsByUser(this.objectId);
        }
        break;

      case("items") :
        if(this.company) {
          this.dataService = this.itemService.getAllItems(this.objectId);
        } else {
          this.dataService = this.itemService.getAllItems(this.objectId);
        }
        break;
      
      default: 
       alert("Cannot set data service.");
    }

    this.fetchData();
  }

  fetchData()  {
    let objArr = [];
    this.dataService.subscribe(data => {

      if(data.length == 0) {
        alert("No data exists for selected options.");
        this.clearDataTableandView();
      } else {
        data.forEach(dataObject => {
          this.removeProps(dataObject) //remove unwanted properties from displaying
         objArr.push(dataObject);
       });
      }
    });

    this.rows = objArr;
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

  GenerateColumns() {
    this.columns = Object.keys(this.rows[0]);
    this.createDataSource();
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource<Object>(this.rows);
  }

  clearDataTableandView() {
    this.company = false;
    this.user = false;
    this.resourceType = false;
    this.selectedId = false;
    this.rows.length = 0;
    this.columns.length = 0;
    this.createDataSource();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

