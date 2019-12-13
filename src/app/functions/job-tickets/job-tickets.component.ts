import { Component, OnInit } from '@angular/core';
import { UseticketService } from 'src/app/services/useticket.service';
import { IjobTicket } from 'src/app/interfaces/ijob-ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-tickets',
  templateUrl: './job-tickets.component.html',
  styleUrls: ['./job-tickets.component.css']
})
export class JobTicketsComponent implements OnInit {
  tickets: IjobTicket[] = [];


  constructor(
    private ticketService: UseticketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
    });
  
  }

create() {
  this.router.navigateByUrl("create-ticket");
}

}
