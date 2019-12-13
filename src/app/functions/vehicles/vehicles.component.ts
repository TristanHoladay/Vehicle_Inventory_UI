import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Ivehicles } from 'src/app/interfaces/ivehicles';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Ivehicles[] = [];
  addVehicle: Ivehicles = {
    id: 1,
    name: "",
    model: "",
    licensePlate: "",
    status: "",
    notes: "",
    vehicleT: null
  }

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });
  
  }


}
