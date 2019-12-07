import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: '',
      established: new  FormControl(new  Date()),
      comments: ''
    });
  }

  addLogin(username, password, established, comments) {
    this.loginService.addLogin(username, password, established, comments).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
