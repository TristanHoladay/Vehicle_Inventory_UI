import { Component, OnInit } from '@angular/core';
import { UseticketService } from 'src/app/services/useticket.service';
import { IjobTicket } from 'src/app/interfaces/ijob-ticket';

@Component({
  selector: 'app-job-tickets',
  templateUrl: './job-tickets.component.html',
  styleUrls: ['./job-tickets.component.css']
})
export class JobTicketsComponent implements OnInit {
  tickets: IjobTicket[] = [];


  constructor(
    private ticketService: UseticketService
  ) { }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
    });
  
  }

  update(id: number, ticket: IjobTicket) {
    ticket.notes = "TESTING UPDATE FROM FRONT END";
    this.ticketService.update(id, ticket).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: number) {
    this.ticketService.delete(id).subscribe(data => {
      console.log(data);
    });
  }

}
