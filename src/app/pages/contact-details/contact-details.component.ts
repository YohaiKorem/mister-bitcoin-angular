import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact | null = null;
  contact$!: Observable<Contact>;
  loggedInUser: User | null = null;
  loggedInUser$!: Observable<User>;
  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser;
    this.subscription.add(
      this.loggedInUser$.subscribe((user) => {
        this.loggedInUser = user;
      })
    );
    this.contact$ = this.route.data.pipe(
      map((data) => {
        this.contact = data['contact'];
        return data['contact'];
      })
    );
  }
  getMovesForContact(): Move[] {
    return this.filteredMoves()!;
  }

  filteredMoves() {
    return this.loggedInUser?.moves.filter((move) => {
      return move.to?._id === this.contact?._id;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack(): void {
    this.location.back();
  }

  onTransferFunds(amount: number): void {
    if (this.loggedInUser && this.contact) {
      this.userService.changeBalance(amount, this.loggedInUser, this.contact);
    }
  }
}
