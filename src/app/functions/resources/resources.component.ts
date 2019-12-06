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
    id: null,
    name: "HP Notebook",
    description: "the description",
    amount: 1,
    cost: 700,
    resourceTypeId: 2,
    resourceType: null,
    storageLocation: "armory",
    companyId: 1,
    company: null,
    useTicketId: null,
    useTicket: null,
  }

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.itemService.getAllItems(1).subscribe(data => {
      this.Items = data;
    });

      this.itemService.getItemById(2).subscribe(data => {
        this.oneItem = data;
      });

    this.itemService.addItem(this.addItem).subscribe(data => {
        console.log(data);
      });
  
  }

  updateItem(id: number, item: Iitem) {
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
