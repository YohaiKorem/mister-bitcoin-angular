import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}
  loggedInUser: User | null = null;
  loggedInUser$!: Observable<User>;
  isLoginClicked: boolean = false;
  isSignupClicked: boolean = true;
  credentials: any = {};
  signupInfo: any = {};

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser();
  }

  handleLogIn() {}
  handleSignup() {}
  handleLogout() {}
  handleToggleForm() {
    this.isLoginClicked = !this.isLoginClicked;
    this.isSignupClicked = !this.isSignupClicked;
  }
}
