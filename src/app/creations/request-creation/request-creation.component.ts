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
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';

@Component({
  selector: 'app-request-creation',
  templateUrl: './request-creation.component.html',
  styleUrls: ['./request-creation.component.css']
})
export class RequestCreationComponent implements OnInit {
form = new FormGroup({});
options: FormlyFormOptions = {};
token: string;

  model = {
    id: 1,
    details: "",
    date: Date.now(),
    complete: false,
    companyId: 0,
    company: "",
    resourceTypeId: 0,
    resourceType: "",
    userId: "",
    user: "",
    requestT: "",
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'details',
      type: 'textarea',
      templateOptions: {
        label: 'Request Details',
        required: true
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
    {
      key: 'resourceTypeId',
      type: 'select',
      templateOptions: {
        label: 'Resource Type',
        options: this.rtService.getAllResourceTypes(),
        valueProp: 'id',
        labelProp: 'name'
      }
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private requestService: InventoryrequestService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
  ) { }

  ngOnInit() {
    this.token = this.authService.decodeToken();
  }

  onSubmit(form) {
    form.value.userId = this.token['sub'];
    this.requestService.add(form.value).subscribe(data => {
      console.log(data);
    });

    this.router.navigate(['requests']);
  }

}
