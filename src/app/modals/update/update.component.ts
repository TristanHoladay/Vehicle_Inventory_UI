import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DiscriminatorService } from 'src/app/services/discriminator.service';

@Component({
  selector: 'update-modal',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateModal implements OnInit {
  @Input() updateObject: any;
  form: FormGroup;
  objectProps: string[] = [];
  closeResult: string;
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
    const formDataObject = Object.keys(this.updateObject).reduce((formObj, prop) => {
      formObj[prop] = new FormControl(this.updateObject[prop])

      //if property is NOT found in the nonPrintProp array then add it to objectProps array
      //which will be used for outputting certain FormControl values to the view
      if(!this.nonPrintProps.includes(prop)){
        this.objectProps.push(prop);
      }
      
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);

    //use discriminator service to get object type
    this.discService.getObjectType(this.updateObject);
    //set component service to correct object service, which is determined by discService
    this.service = this.discService.objectService;
  }


  update(objectData) {
    var id = objectData.id;
    console.log(objectData);
    this.service.update(id, objectData).subscribe(data => {
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
