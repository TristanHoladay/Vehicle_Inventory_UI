import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ItemService } from 'src/app/services/item.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { UseticketService } from 'src/app/services/useticket.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { UservehiclesService } from 'src/app/services/uservehicles.service';
import { IUser } from 'src/app/interfaces/iuser';
import { ServicesArrayService } from 'src/app/services/services-array.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { Ivehicles } from 'src/app/interfaces/ivehicles';
import { IRequest } from 'src/app/interfaces/irequest';
import { Iitem } from 'src/app/interfaces/iitem';
import { IUserVehicles } from 'src/app/interfaces/user-vehicles';
import { IjobTicket } from 'src/app/interfaces/ijob-ticket';
import { IResourceType } from 'src/app/interfaces/resource-type';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteModal implements OnInit {
  @Input() delObject: any;
  service: any;
  closeResult: string;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private itemService: ItemService,
    private typeService: ResourcetypeService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private uservehiclesService: UservehiclesService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getObjectType(this.delObject);
  }

  getObjectType(delObject: IUser | ICompany | Ivehicles | IRequest | Iitem | IUserVehicles | IjobTicket | IResourceType) {
    if ("userT" in delObject) {
      this.service = this.userService;
    }

    if ("compT" in delObject) {
      this.service = this.companyService;
    }

    if ("vehicleT" in delObject) {
      this.service = this.vehicleService;
    }

    if ("requestT" in delObject) {
      this.service = this.requestService;
    }

    if ("itemT" in delObject) {
      this.service = this.itemService;
    }

    if ("uvT" in delObject) {
     this.service = this.uservehiclesService;
    }

    if ("ticketT" in delObject) {
      this.service = this.ticketService;
    }

    if ("resourceTypeT" in delObject) {
       this.service = this.typeService;
    }
  }


  deleteObject(delObject: any) {
    console.log(delObject.id);
    this.service.delete(delObject.id).subscribe(data => {
      console.log(data);
    })
    // this.service.delete(delObject.id).subscribe(data => {
    //   console.log(data);
    // });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
