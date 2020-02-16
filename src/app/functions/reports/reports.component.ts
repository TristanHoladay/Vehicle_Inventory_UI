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

  
  createDataSource(type: string) {
    let newDataArr = [];
    
    if(type == 'tickets' && this.company) {
      this.companyService.getTicketsbyCompany(this.objectId).subscribe(data => {
        //foreach loop through data and push only the properties and values you want into a new object?
        //columns will be based on the properties of the new objects
        data.forEach(dataObject => {
          this.removeProps(dataObject)
          newDataArr.push(dataObject);
        });
        this.rows = newDataArr;
      });
    } else {
      this.userService.getTicketsByUser(this.objectId).subscribe(data => {
        this.rows = data;
      });
    }

    if(type == 'requests' && this.company) {
      this.companyService.getRequestsByCompany(this.objectId).subscribe(data => {
        this.rows = data;
      });
    } else {
      this.userService.getRequestsByUser(this.objectId).subscribe(data => {
        this.rows = data;
      });
    }

    if(type == 'items' && this.company) {
      this.itemService.getAllItems(this.objectId).subscribe(data => {
        this.rows = data;
      });
    } else {
      this.rtService.getItemsByResourceType(this.objectId).subscribe(data => {
        this.rows = data;
      });
    }

      this.dataSource = new MatTableDataSource<Object>(this.rows);
  }

GenerateColumns() {
  console.log(this.rows[0]);
    this.columns = Object.keys(this.rows[0]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeProps(dataObject: object): IDynamicObject {

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
}

