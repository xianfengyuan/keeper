import { Component, ViewChild, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { LoginService, AuthenticationService } from '../../_services';
import { Login, User } from '../../_models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  currentUser: User;
  logins: any;
  displayedColumns = ['username', 'established', 'comments', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private authenticationService: AuthenticationService,
    private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.fetchLogins();
  }

  fetchLogins() {
    this.loginService.getAll()
      .pipe(first())
      .subscribe((data: Login[]) => {
        this.logins = new MatTableDataSource(data);
        this.logins.paginator = this.paginator;
        this.logins.sort = this.sort;
        console.log('Data requested ...');
        console.log(this.logins);
      });
  }

  editLogin(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteLogin(id) {
    this.loginService.delete(id).subscribe(() => {
      this.snackBar.open('login deleted successfully', 'OK', {
        duration: 3000,
      });
      this.fetchLogins();
    })
  }

  applyFilter(filterValue: string) {
    this.logins.filter = filterValue.trim().toLowerCase();
  }

}
