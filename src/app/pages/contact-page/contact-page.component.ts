import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  subscription!: Subscription;
  contacts: Contact[] | null = null;
  contacts$!: Observable<Contact[]>;

  ngOnInit() {
    this.contacts$ = this.contactService.contacts$;
  }

  onRemoveContact(contactId: string) {
    this.contactService.removeContact(contactId).subscribe({
      error: (err) => console.log('err:', err),
    });
  }
}
