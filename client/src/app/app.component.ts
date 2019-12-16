import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'keeper';
  user: SocialUser;
  loggedIn: boolean;
  users: any;

  constructor(private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        this.userService.getUserByEmail(user.email).subscribe((data: User[]) => {
          this.loggedIn = (data.length > 0 && data[0].email == user.email);
          console.log(user);
          console.log(this.loggedIn);
          if (!this.loggedIn) {
            this.snackBar.open('Credential mismatch', 'Logged out state', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      x => this.userService.getUserByEmail(x.email).subscribe((data: User[]) => {
        this.loggedIn = (data.length > 0 && data[0].email == x.email);
        if (!this.loggedIn) {
          this.snackBar.open('Credential mismatch', 'Logged out state', {
            duration: 3000,
          });
        }
      })
    );
  }

  signOut(): void {
    this.authService.signOut().then(
      x => {
        this.loggedIn = false;
      }
    );
  }
}
