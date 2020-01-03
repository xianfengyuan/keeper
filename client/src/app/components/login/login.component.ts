import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';

import { AppService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private appService: AppService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { 
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  reactiveForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.appService.setUserLoggedIn(true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.snackBar.open('Login failed', 'Try again', {
            duration: 3000,
          });
          this.loading = false;
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
}
