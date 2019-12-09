import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'update-modal',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateModal implements OnInit {
  @Input() updateObject: any;
  form: FormGroup;
  objectProps: string[];
  closeResult: string;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    const formDataObject = Object.keys(this.updateObject).reduce((formObj, prop) => {
      formObj[prop] = new FormControl(this.updateObject[prop])
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);
    console.log(this.form);

    this.objectProps = Object.keys(this.updateObject);
    this.objectProps.forEach( function(value) {
      console.log(value);
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
