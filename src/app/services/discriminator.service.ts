import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { ICompany } from '../interfaces/icompany';
import { Ivehicles } from '../interfaces/ivehicles';
import { IRequest } from '../interfaces/irequest';
import { IUserVehicles } from '../interfaces/user-vehicles';
import { Iitem } from '../interfaces/iitem';
import { IjobTicket } from '../interfaces/ijob-ticket';
import { IResourceType } from '../interfaces/resource-type';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { VehicleService } from './vehicle.service';
import { ItemService } from './item.service';
import { ResourcetypeService } from './resourcetype.service';
import { UseticketService } from './useticket.service';
import { InventoryrequestService } from './inventoryrequest.service';
import { UservehiclesService } from './uservehicles.service';

@Injectable({
  providedIn: 'root'
})
export class DiscriminatorService {
  objectService: any;
  formObject: any;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private itemService: ItemService,
    private typeService: ResourcetypeService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private uservehiclesService: UservehiclesService
  ) { }

  getObjectType(object: IUser | ICompany | Ivehicles | IRequest | Iitem | IUserVehicles | IjobTicket | IResourceType) {
    if ("userT" in object) {
      this.objectService = this.userService;
      this.formObject = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        jobDescription: "",
        adminRole: null
      }
    }

    if ("compT" in object) {
      this.objectService = this.companyService;
    }

    if ("vehicleT" in object) {
      this.objectService = this.vehicleService;
    }

    if ("requestT" in object) {
      this.objectService = this.requestService;
    }

    if ("itemT" in object) {
      this.objectService = this.itemService;
    }

    if ("uvT" in object) {
     this.objectService = this.uservehiclesService;
    }

    if ("ticketT" in object) {
      this.objectService = this.ticketService;
    }

    if ("resourceTypeT" in object) {
       this.objectService = this.typeService;
    }
  }
}
