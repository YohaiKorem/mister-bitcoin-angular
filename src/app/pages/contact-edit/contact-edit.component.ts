import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { Subscription, filter, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.child-page') myClass = true;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contact = this.contactService.getEmptyContact() as Contact;
  subscription!: Subscription;

  ngOnInit(): void {
    document.documentElement.classList.add('no-scroll');
    this.subscription = this.route.data
      .pipe(
        map((data) => data['contact']),
        filter((contact) => contact)
      )
      .subscribe((contact) => (this.contact = contact));
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact).subscribe({
      next: () => this.router.navigateByUrl('/contact'),
      error: (err) => console.log('err:', err),
    });
  }
  onRemoveContact() {
    if (this.contact._id)
      this.contactService.removeContact(this.contact!._id).subscribe({
        next: () => this.router.navigateByUrl('/contact'),

        error: (err) => console.log('err:', err),
      });
  }
  ngOnDestroy(): void {
    document.documentElement.classList.remove('no-scroll');

    this.subscription?.unsubscribe();
  }
}
