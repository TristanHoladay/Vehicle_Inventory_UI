import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Iitem } from 'src/app/interfaces/iitem';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  Items: Iitem[] = [];
  oneItem: Iitem;
  addItem: Iitem =  {
    id: 1,
    name: "HP Notebook",
    description: "the description",
    amount: 1,
    cost: 700,
    resourceTypeId: 2,
    resourceType: null,
    storageLocation: "armory",
    companyId: 1,
    company: null,
    vehicleId: 0,
    vehicle: null,
    useTicketId: 0,
    useTicket: null,
  }

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.itemService.getAllItems(1).subscribe(data => {
      this.Items = data;
    });

      this.itemService.getItemById(9).subscribe(data => {
        this.oneItem = data;
        console.log(this.oneItem.id + " " + this.oneItem.company);
      });
  
  }

  updateItem(id: number, item: Iitem) {
    item.name = "TESTING UPDATE FROM FRONT END";
    this.itemService.updateItem(id, item).subscribe(data => {
      console.log(data);
    });
  }

  deleteItem(id: number) {
    this.itemService.delete(id).subscribe(data => {
      console.log(data);
    })
  }
  

}
