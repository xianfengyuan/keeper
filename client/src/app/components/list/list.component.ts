import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchLogins();
  }

  fetchLogins() {
    this.loginService
      .getLogins()
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
    this.loginService.deleteLogin(id).subscribe(() => {
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
