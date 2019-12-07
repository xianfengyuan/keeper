import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  login: any = {};
  updateForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.loginService.getLoginById(this.id).subscribe(res => {
        this.login = res;
        this.updateForm.get('username').setValue(this.login.username);
        this.updateForm.get('password').setValue(this.login.password);
        this.updateForm.get('established').setValue(this.login.established);
        this.updateForm.get('comments').setValue(this.login.comments);
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      username: ['', Validators.required ],
      password: '',
      established: '',
      comments: ''
    });
  }

  updateLogin(username, password, established, comments) {
    this.loginService.updateLogin(this.id, username, password, established, comments).subscribe(() => {
      this.snackBar.open('login updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

}
