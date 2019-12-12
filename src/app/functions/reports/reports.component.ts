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

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

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

}
