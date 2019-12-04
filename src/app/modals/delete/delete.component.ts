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

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteModal implements OnInit {
  @Input() delObject: object;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private userService: UserService<IUser>,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private itemService: ItemService,
    private typeService: ResourcetypeService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private uservehiclesService: UservehiclesService
    ) { }

  ngOnInit() {}

  deleteObject(object: any) {
    
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
