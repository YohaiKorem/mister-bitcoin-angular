import { Component, HostBinding, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { BitcoinService } from '../services/bitcoin.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'main-layout',
  },
})
export class AppComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private bitcoinService: BitcoinService,
    private userService: UserService
  ) {}
  title = 'mister-bitcoin';
  ngOnInit(): void {
    this.contactService.loadContacts().subscribe({
      error: (err) => console.log('err', err),
    });
    // this.bitcoinService.fetchData();
  }
}
