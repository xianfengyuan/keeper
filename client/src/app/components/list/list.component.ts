import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { LoginService } from '../../login.service';
import { Login } from '../../login.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  logins: any;
  displayedColumns = ['username', 'established', 'comments', 'actions'];

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.fetchLogins();
  }

  fetchLogins() {
    this.loginService
      .getLogins()
      .subscribe((data: Login[]) => {
        this.logins = new MatTableDataSource(data);
        console.log('Data requested ...');
        console.log(this.logins);
      });
  }

  editLogin(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteLogin(id) {
    this.loginService.deleteLogin(id).subscribe(() => {
      this.fetchLogins();
    })
  }

  applyFilter(filterValue: string) {
    this.logins.filter = filterValue.trim().toLowerCase();
  }

}
