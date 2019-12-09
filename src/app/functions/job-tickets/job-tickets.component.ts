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
  oneTicket: IjobTicket;
  addTicket: IjobTicket = {
    id: 1,
    tisNumber: 7737,
    date: new Date(),
    notes: "This is an added use ticket. yay!!!",
    userId: "e09c2341-3226-437f-a4bd-8c4c41395803",
    user: null,
    companyId: 1,
    company: null,
    ticketT: null
  }

  constructor(
    private ticketService: UseticketService
  ) { }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
    });

      this.ticketService.getTicketById(3).subscribe(data => {
        this.oneTicket = data;
        console.log(this.oneTicket.id + " " + this.oneTicket.company);
      });

      this.ticketService.add(this.addTicket).subscribe(data => {
        console.log(data);
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
