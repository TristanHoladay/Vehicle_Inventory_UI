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
  oneRequest: IRequest;
  addRequest: IRequest = {
    id: 1,
    details: "This is an added inventory request",
    date: new Date(),
    complete: false,
    userId: "e09c2341-3226-437f-a4bd-8c4c41395803",
    user: "Brian Holt",
    companyId: 2,
    company: null,
    resourceTypeId: 1,
    resourceType: null,
    requestT: null
  }

  constructor(
    private reqService: InventoryrequestService
  ) { }

  ngOnInit() {
    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
    });

      this.reqService.getRequestById(2).subscribe(data => {
        this.oneRequest = data;
        console.log(this.oneRequest.id + " " + this.oneRequest.company);
      });

      this.reqService.add(this.addRequest).subscribe(data => {
        console.log(data);
      })
  
  }

  update(id: number, request: IRequest) {
    request.details = "TESTING UPDATE FROM FRONT END";
    this.reqService.update(id, request).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: number) {
    this.reqService.delete(id).subscribe(data => {
      console.log(data);
    })
  }

}
