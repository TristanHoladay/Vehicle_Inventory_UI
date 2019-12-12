import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/interfaces/irequest';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';

@Component({
  selector: 'app-inventory-request',
  templateUrl: './inventory-request.component.html',
  styleUrls: ['./inventory-request.component.css']
})
export class InventoryRequestComponent implements OnInit {
  requests: IRequest[] = [];

  constructor(
    private reqService: InventoryrequestService
  ) { }

  ngOnInit() {
    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
    });
  
  }

}
