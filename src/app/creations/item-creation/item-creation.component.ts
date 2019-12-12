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

@Component({
  selector: 'item-creation',
  templateUrl: './item-creation.component.html',
  styleUrls: ['./item-creation.component.css']
})
export class ItemCreationComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model: any = {
    id: 1,
    name: "",
    description: "",
    amount: null,
    cost: null,
    storageLocation: "",
    companyId: null,
    company: "",
    resourceTypeId: null,
    resourceType: "",
    vehicleId: 0,
    vehicle: "",
    useTicketId: 0,
    useTicket: "",
    itemT: ""
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Item Name'
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        max: 250
      }
    },
    {
      key: 'amount',
      type: 'input',
      templateOptions: {
        label: 'Amount',
        type: 'number',
      }
    },
    {
      key: 'cost',
      type: 'input',
      templateOptions: {
        label: 'Cost Per Unit',
        type: 'number',
      }
    },
    {
      key: 'storageLocation',
      type: 'input',
      templateOptions: {
        label: 'Storage Location (i.e Armory, Cage, Vehicle)',
        type: 'string',
        max: 60
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
    {
      key: 'vehicleId',
      type: 'select',
      templateOptions: {
        label: 'Vehicle (If stored on Vehicle)',
        options: this.vehicleService.getAllVehicles(),
        valueProp: 'id',
        labelProp: 'name'
      }
    }
  ];
  

  constructor(
    private modalService: NgbModal,
    private itemService: ItemService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit(form) {
    this.itemService.add(form.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['resources']);
    });
  }

}
