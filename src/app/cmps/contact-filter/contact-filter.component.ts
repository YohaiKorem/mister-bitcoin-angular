import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent implements OnInit, OnDestroy {
  constructor(private contactService: ContactService) {}

  contactFilter = {} as ContactFilter;
  private filterSubject$ = new Subject<string>();
  private destroySubject$ = new Subject<null>();

  ngOnInit() {
    this.contactService.contactFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((contactFilter) => {
        this.contactFilter = contactFilter;
      });

    this.filterSubject$
      .pipe(takeUntil(this.destroySubject$), debounceTime(500))
      .subscribe(() => {
        this.contactService.setFilter(this.contactFilter);
      });
  }

  onSetFilter(val: string) {
    // this.contactService.setFilter(this.contactFilter);
    this.filterSubject$.next(val);
  }

  trackByFn(idx: number, item: any) {
    return item.key;
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.unsubscribe();
  }
}
