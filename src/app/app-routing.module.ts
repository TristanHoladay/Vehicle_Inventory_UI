import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './functions/users/users.component';
import { VehiclesComponent } from './functions/vehicles/vehicles.component';
import { ResourcesComponent } from './functions/resources/resources.component';
import { ReportsComponent } from './functions/reports/reports.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { CompaniesComponent } from './functions/companies/companies.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { 
    path: 'admin',
    component: AdminHomePageComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
   },
  { path: 'home', component: UserHomePageComponent},
  { path: 'users', component: UsersComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
