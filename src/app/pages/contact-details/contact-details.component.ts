import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { Observable, lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Location } from '@angular/common';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { TransferFundsComponent } from 'src/app/cmps/transfer-funds/transfer-funds.component';
import { MovesListComponent } from 'src/app/cmps/moves-list/moves-list.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  location = inject(Location);
  // subscription!: Subscription;
  contact: Contact | null = null;
  contact$!: Observable<Contact>;
  ans$!: string;
  ans = '';
  loggedInUser: User | null = null;
  loggedInUser$!: Observable<User>;
  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser();
    this.contact$ = this.route.data.pipe(map((data) => data['contact']));

    // this.subscription = this.contactService
    //   .getContactById(this.contactId)
    //   .subscribe((contact) => {
    //     this.contact = contact;
    //   });
  }
  onBack() {
    this.router.navigateByUrl('/contact');
    // this.router.navigate(['/'])
    // this.location.back()
  }
}
