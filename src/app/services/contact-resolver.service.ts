import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { delay } from 'rxjs';
import { ContactService } from './contact.service';

export function ContactResolver(route: ActivatedRouteSnapshot) {
  const id = route.params['id'];
  console.log(id);

  return inject(ContactService).getContactById(id).pipe(delay(10));
}
