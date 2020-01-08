import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,  } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { DiscriminatorService } from 'src/app/services/discriminator.service';

@Component({
  selector: 'creation-modal',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  @Input() creationObject: any;
  closeResult: string;
  form: FormGroup;
  objectProps: string[] = [];
  service: any;
  nonPrintProps: string[] = [
    "id", 
    "companyId",
    "userId", 
    "resourceTypeId", 
    "vehicleId", 
    "useTicketId", 
    "ticketT", 
    "itemT", 
    "compT",
    "requestT",
    "userT",
    "vehicleT",
    "resourceTypeT",
    "uvT"
  ];

  constructor(
    private modalService: NgbModal,
    private discService: DiscriminatorService
  ) { }

  ngOnInit() {
    const formDataObject = Object.keys(this.creationObject).reduce((formObj, prop) => {
      formObj[prop] = new FormControl(this.creationObject[prop])

      //if object property is not in non print array then add to object prop array
      //which will output form fields to the view
      if(!this.nonPrintProps.includes(prop)) {
        this.objectProps.push(prop);
      }
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);

    //use discriminator service to get object type
    this.discService.getObjectType(this.creationObject);
    //set component service to correct object service, which is determined by discService
    this.service = this.discService.objectService;
  }

  create(objectData){
    this.service.add(objectData).subscribe(data => {
      console.log(data);
    });
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
