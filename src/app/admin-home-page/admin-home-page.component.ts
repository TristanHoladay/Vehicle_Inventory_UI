import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { InventoryrequestService } from '../services/inventoryrequest.service';
import { Ivehicles } from '../interfaces/ivehicles';
import { IRequest } from '../interfaces/irequest';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/iuser';
import { CompanyService } from '../services/company.service';
import { UseticketService } from '../services/useticket.service';
import { ItemService } from '../services/item.service';
import { ResourcetypeService } from '../services/resourcetype.service';
import { ICompany } from '../interfaces/icompany';
import { IjobTicket } from '../interfaces/ijob-ticket';
import { IResourceType } from '../interfaces/resource-type';
import { Iitem } from '../interfaces/iitem';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {
showOptions: boolean = false;
showGreeting: boolean = true;

vehicles: Ivehicles[];
requests: IRequest[];
users: IUser[];
companies: ICompany[];
tickets: IjobTicket[];
types: IResourceType[];
items: Iitem[];

  constructor(
    private vehService: VehicleService,
    private reqService: InventoryrequestService,
    private userService: UserService,
    private compService: CompanyService,
    private ticketService: UseticketService,
    private itemService: ItemService,
    private rtService: ResourcetypeService
  ) { }

  ngOnInit() {
    this.vehService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });

    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.compService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  vehNum(): number {
    let vehNum = 0;

    this.vehicles.forEach(function(veh) {
      if(veh.status != "in") {
        vehNum++;
      }
    });

    return vehNum;
  }

  reqNum(): number {
    let reqNum = 0;

    this.requests.forEach(function(req) {
      if(!req.complete) {
        reqNum++;
      }
    });

    return reqNum;
  }

}
