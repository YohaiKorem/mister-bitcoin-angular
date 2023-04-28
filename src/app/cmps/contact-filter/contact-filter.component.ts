import { Component, OnInit } from '@angular/core';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  contactFilter = {} as ContactFilter;
  private filterSubject = new Subject<ContactFilter>();

  ngOnInit() {
    this.contactService.contactFilter$.subscribe(
      (contactFilter) => (this.contactFilter = contactFilter)
    );
    this.filterSubject
      .pipe(debounceTime(500))
      .subscribe(() => this.onSetFilter());
  }

  onSetFilter() {
    this.contactService.setFilter(this.contactFilter);
  }
}
