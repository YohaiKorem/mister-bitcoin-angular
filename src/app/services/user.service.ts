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
  map,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SignupInfo } from '../models/signup-info.model';
import { Contact } from '../models/contact.model';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

const ENTITY = 'user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();
  private _loggedInUser$ = new BehaviorSubject<User>(this.sessionStorageUser);
  public loggedInUser = this._loggedInUser$.asObservable();
  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users) => this._users$.next(users));
  }

  public getUsers() {
    return from(storageService.query(ENTITY)).pipe(
      retry(1),
      catchError(this._handleError)
    );
  }

  public login(info: any): Observable<User> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find((user) => user.name === info.name);
        console.log(user);

        if (user) {
          return this._saveLocalUser(user);
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      tap((user) => {
        this._loggedInUser$.next(user);
      }),
      catchError(this._handleError)
    );
  }

  public signup(info: any) {
    let newUser = new User(this._getRandomId(), info.name, 100, []);
    newUser = this._saveLocalUser(newUser);
    return from(storageService.post(ENTITY, newUser)).pipe(
      tap((newUser) => {
        const users = this._users$.value;
        this._users$.next([...users, newUser]);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    return null;
  }

  public changeBalance(amount: number, user: User, contact: Contact) {
    if (!this.loggedInUser) throw new Error('Not logged in');

    user.coins = user.coins - amount;
    return this.addMove(contact, amount, user);
    // let res = this.addMove(contact, amount, user).pipe(
    //   tap((user) => {
    //     return user;
    //   })
    // );

    // return res;
  }

  public addMove(contact: Contact, amount: number, user: User): User {
    const move = {
      id: this._getRandomId(),
      amount,
      to: contact,
      at: Date.now(),
    };
    user.moves.unshift(move);
    this._updateUser(user);
    return user;
    // let res = this._updateUser(user).pipe(
    //   tap((user) => {
    //     return user;
    //   })
    // );
    // return res;
  }

  private _updateUser(user: User) {
    console.log('before');
    storageService.put(ENTITY, user);
    this._saveLocalUser(user);

    // let res = from(storageService.put(ENTITY, user)).pipe(
    //   tap((updatedUser) => {
    //     console.log('start');
    //     const users = this._users$.value;
    //     const userIdx = users.findIndex((_user) => _user._id === user._id);
    //     users.splice(userIdx, 1, updatedUser);
    //     console.log('update:', updatedUser);
    //     this._users$.next([...users]);
    //     this._saveLocalUser(updatedUser);
    //     return updatedUser;
    //   }),
    //   retry(1),
    //   catchError(this._handleError)
    // );

    // return res;
  }

  private _saveLocalUser(user: User) {
    console.log(user);

    // user = {
    //   _id: user._id,
    //   name: user.name,
    //   coins: user.coins,
    //   moves: user.moves,
    // };
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    const users = this._users$.value;
    const userIdx = users.findIndex((_user) => _user._id === user._id);
    users.splice(userIdx, 1, user);

    return user;
  }

  public get sessionStorageUser(): User {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    return user ? JSON.parse(user) : null;
  }

  private set sessionStorageUser(user: User) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  }

  private _createUsers() {
    console.log('creating users');
  }

  private _getRandomId(length = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in user service:', err);
    return throwError(() => err);
  }
}
