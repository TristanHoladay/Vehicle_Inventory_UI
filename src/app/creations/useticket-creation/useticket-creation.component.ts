import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { CompanyService } from 'src/app/services/company.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { Router } from '@angular/router';
import { UseticketService } from 'src/app/services/useticket.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'useticket-creation',
  templateUrl: './useticket-creation.component.html',
  styleUrls: ['./useticket-creation.component.css']
})
export class UseticketCreationComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  items: [];
  token: string;

  model: any = {
    id: 1,
    tisNumber: "",
    date: Date.now(),
    notes: "",
    userId: "",
    user: "",
    companyId: 0,
    company: "",
    ticketT: "",
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'tisNumber',
      type: 'input',
      templateOptions: {
        label: 'ConnectWise Ticket #',
        type: 'number',
        required: true
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'Notes',
        max: 300
      }
    },
    {
      key: 'companyId',
      type: 'select',
      templateOptions: {
        label: 'Company',
        options: this.companyService.getAllCompanies(),
        valueProp: 'id',
        labelProp: 'name'
      }
    },
  ];
  

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private itemService: ItemService,
    private ticketService: UseticketService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.authService.decodeToken();
  }

  onSubmit(form) {
    form.value.userId = this.token['sub'];
    console.log(form.value)
    this.ticketService.add(form.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['tickets']);
    });
  }
}
