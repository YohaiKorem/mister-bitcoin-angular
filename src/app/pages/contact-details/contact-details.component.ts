import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { TransferFundsComponent } from 'src/app/cmps/transfer-funds/transfer-funds.component';
import { MovesListComponent } from 'src/app/cmps/moves-list/moves-list.component';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private contactService: ContactService
  ) {}
  subscription!: Subscription;
  contactId = '5a56640269f443a5d64b32ca';
  contact: Contact | null = null;
  contact$!: Observable<Contact>;
  title = `Moves to ${this.contact?.name}`;
  loggedInUser: User | null = null;
  loggedInUser$!: Observable<User>;
  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser();

    this.subscription = this.contactService
      .getContactById(this.contactId)
      .subscribe((contact) => {
        this.contact = contact;
      });
  }
}
