import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../interfaces/icompany';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url: string = this.urlService.getURL();

  constructor(
    private http: HttpClient,
    private urlService: UrlService
    ) { }

    getAllCompanies(): Observable<ICompany[]> {
      return this.http.get<ICompany[]>(
        `${this.url}/companies`
      );
    }
  
    getCompanyById(id: number): Observable<ICompany> {
      return this.http.get<ICompany>(
        `${this.url}/companies/` + id
      );
    }

  
    add(user: ICompany): Observable<ICompany> {
      return this.http.post<ICompany>(
        `${this.url}/companies`, user
      );
    }
  
    update(id: number, company: ICompany): Observable<ICompany> {
      return this.http.put<ICompany>(
      `${this.url}/companies/` + id , company
      );
    }
  
    delete(id: number): Observable<ICompany> {
      return this.http.delete<ICompany>(
        `${this.url}/companies/` + id
      );
    }
}
