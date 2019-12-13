import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Iitem } from 'src/app/interfaces/iitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  items: Iitem[] = [];

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.itemService.getAllItems(1).subscribe(data => {
      this.items = data;
    });
  
  }

  create(){
    this.router.navigate(['create-item']);
  }
  

}
