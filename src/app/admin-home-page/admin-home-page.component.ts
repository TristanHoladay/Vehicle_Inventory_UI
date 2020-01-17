import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { InventoryrequestService } from '../services/inventoryrequest.service';
import { Ivehicles } from '../interfaces/ivehicles';
import { IRequest } from '../interfaces/irequest';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {
showOptions: boolean = false;
showGreeting: boolean = true;

vehicles: Ivehicles[] = [];
requests: IRequest[] = [];

  constructor(
    private vehService: VehicleService,
    private reqService: InventoryrequestService
  ) { }

  ngOnInit() {
    this.vehService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });

    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
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
