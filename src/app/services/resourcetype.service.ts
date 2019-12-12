import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { IResourceType } from '../interfaces/resource-type';

@Injectable({
  providedIn: 'root'
})
export class ResourcetypeService {
  url: string = this.URL.getURL();

  constructor(
    private URL: UrlService,
    private http: HttpClient
  ) { }

  getAllResourceTypes(): Observable<IResourceType[]> {
    return this.http.get<IResourceType[]>(
      `${this.url}/resourcetype`
    );
  }

  getResourceTypeById(id: number): Observable<IResourceType> {
    return this.http.get<IResourceType>(
      `${this.url}/resourcetype/` + id
    );
  }


  add(rt: IResourceType): Observable<IResourceType> {
    return this.http.post<IResourceType>(
      `${this.url}/resourcetype`, rt
    );
  }

  update(id: number, rt: IResourceType): Observable<IResourceType> {
    return this.http.put<IResourceType>(
    `${this.url}/resourcetype/` + id , rt
    );
  }

  delete(id: number): Observable<IResourceType> {
    return this.http.delete<IResourceType>(
      `${this.url}/resourcetype/` + id
    );
  }
}
