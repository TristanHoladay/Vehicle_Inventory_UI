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
  oneVehicle: Ivehicles;
  addVehicle: Ivehicles = {
    id: 1,
    name: "This is an added vehicle",
    model: "dodge challenger",
    licensePlate: "XXeed7",
    status: "checked-out",
    notes: "These are vehicles notes",
    vehicleT: null
  }

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });

      this.vehicleService.getVehicleById(1).subscribe(data => {
        this.oneVehicle = data;
        console.log(this.oneVehicle.id + " " + this.oneVehicle.name);
      });

      this.vehicleService.addVehicle(this.addVehicle).subscribe(data => {
        console.log(data);
      });
  
  }

  updateVehicle(id: number, vehicle: Ivehicles) {
    vehicle.notes = "TESTING UPDATE FROM FRONT END";
    this.vehicleService.updateVehicle(id, vehicle).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: number) {
    this.vehicleService.delete(id).subscribe(data => {
      console.log(data);
    });
  }

}
