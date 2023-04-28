import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

const ENTITY = 'user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();
  constructor() {
    const users = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!users || users.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()));
    }
  }

  public getUsers() {
    return from(storageService.query(ENTITY)).pipe(
      retry(1),
      catchError(this._handleError)
    );
  }

  public getUser() {
    return new User('101', 'popo', 100, []);
  }

  public get loggedInUser(): User {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    return user ? JSON.parse(user) : null;
  }

  private _createUsers() {
    console.log('creating users');
    return [
      {
        _id: '101',
        name: 'popo',
        coins: 100,
        moves: [],
      },
      {
        _id: '102',
        name: 'shoko',
        coins: 100,
        moves: [],
      },
      {
        _id: '103',
        name: 'lugi',
        coins: 100,
        moves: [],
      },
    ];
  }
  private _handleError(err: HttpErrorResponse) {
    console.log('error in user service:', err);
    return throwError(() => err);
  }
}
