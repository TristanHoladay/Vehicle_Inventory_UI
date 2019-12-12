import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-useticket-creation',
  templateUrl: './useticket-creation.component.html',
  styleUrls: ['./useticket-creation.component.css']
})
export class UseticketCreationComponent implements OnInit {
  options: FormlyFormOptions = {};
  model: any = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'companyId',
      type: 'select',
      templateOptions: {
        label: 'Company',
        options: this.companyService.getAllCompanies(),
        valueProp: 'id',
        labelProp: 'name',
      },
    },
  ];

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
  }

}
