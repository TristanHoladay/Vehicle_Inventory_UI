import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from 'src/app/services/company.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: ICompany[] = [];
  users: IUser[] = [];

  constructor(
    private http: HttpClient,
    private compService: CompanyService
  ) { }

  addCompany: ICompany =  {
    id: 1,
    name: "",
    status: "",
    compT: null
  }


  ngOnInit() {
    this.compService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });
  
  }

  update(id: number, company: ICompany) {
    company.name = "Updated Company Name";
    this.compService.update(id, company).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: number) {
    this.compService.delete(id).subscribe(data => {
      console.log(data);
    })
  }

}
