import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  constructor(private contactService: ContactService) {}
  subscription!: Subscription;
  @Output() remove = new EventEmitter<string>();

  contactId = '5a56640269f443a5d64b32ca';
  contact: Contact | null = null;
  contact$!: Observable<Contact>;

  ngOnInit(): void {
    if (!this.contactId) {
      this.contact = new Contact();
      return;
    }
    this.subscription = this.contactService
      .getContactById(this.contactId)
      .subscribe((contact) => {
        this.contact = contact;
      });
  }

  onSaveContact() {}
  onRemoveContact() {
    this.remove.emit(this.contact!._id);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
