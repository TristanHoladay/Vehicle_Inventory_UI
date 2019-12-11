import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { tokenNotExpired } from 'angular2-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { MatAutocompleteModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth-service.service';
import { InterceptorService } from './services/interceptor.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';


import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './functions/users/users.component';
import { VehiclesComponent } from './functions/vehicles/vehicles.component';
import { ResourcesComponent } from './functions/resources/resources.component';
import { ReportsComponent } from './functions/reports/reports.component';
import { JobTicketsComponent } from './functions/job-tickets/job-tickets.component';
import { CompaniesComponent } from './functions/companies/companies.component';
import { InventoryRequestComponent } from './functions/inventory-request/inventory-request.component';
import { DeleteModal } from './modals/delete/delete.component';
import { UpdateModal } from './modals/update/update.component';
import { CreationComponent } from './modals/creation/creation.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomePageComponent,
    UserHomePageComponent,
    PageNotFoundComponent,
    UsersComponent,
    VehiclesComponent,
    ResourcesComponent,
    ReportsComponent,
    JobTicketsComponent,
    CompaniesComponent,
    InventoryRequestComponent,
    DeleteModal,
    UpdateModal,
    CreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44314"]
      }
    })
  ],
  providers: [
    AuthService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptorService, 
      multi: true
    },
    AuthGuardService,
    RoleGuardService,
    JwtHelperService,
    UserService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

