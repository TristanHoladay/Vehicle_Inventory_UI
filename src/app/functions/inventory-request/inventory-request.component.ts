import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/interfaces/irequest';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-request',
  templateUrl: './inventory-request.component.html',
  styleUrls: ['./inventory-request.component.css']
})
export class InventoryRequestComponent implements OnInit {
  requests: IRequest[] = [];
  show: boolean = false;

  constructor(
    private reqService: InventoryrequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
    });
  
  }

  create() {
    this.router.navigateByUrl("create-request");
  }

  showContent() {
    this.show = true;
  }

}
