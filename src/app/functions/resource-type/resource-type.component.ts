import { Component, OnInit } from '@angular/core';
import { IResourceType } from 'src/app/interfaces/resource-type';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {
  types: IResourceType[] = [];
  show: boolean = false;
  addType: {
    id: 1,
    name: ""
  }

  constructor(
    private typeService: ResourcetypeService
  ) { }

  ngOnInit() {
    this.typeService.getAllResourceTypes().subscribe(data => {
      this.types = data;
    });
  }

  showContent() {
    this.show = true;
  }

}
