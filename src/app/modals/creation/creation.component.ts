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
  objectProps: string[];
  service: any;

  constructor(
    private modalService: NgbModal,
    private discService: DiscriminatorService
  ) { }

  ngOnInit() {
    const formDataObject = Object.keys(this.creationObject).reduce((formObj, prop) => {
      formObj[prop] = new FormControl(this.creationObject[prop])
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);
    console.log(this.form);

    this.objectProps = Object.keys(this.creationObject);
    this.objectProps.forEach( function(value) {
      console.log(value);
    });

    this.discService.getObjectType(this.creationObject);
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
