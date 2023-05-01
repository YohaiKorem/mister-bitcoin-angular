import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}
  private subscription!: Subscription;
  loggedInUser: User | null = null;
  loggedInUser$!: Observable<User>;
  rate!: Object;
  rate$!: Observable<string>;
  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser;
    this.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.rate$ = this.bitcoinService.getRateStream();
  }
}
