import { Component, ViewChild, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';

import { LoginService, AuthenticationService } from '../../_services';
import { Login, User } from '../../_models';
import { DialogComponent } from '../../_components';

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
    private authenticationService: AuthenticationService, private dialog: MatDialog,
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
      }, (error) => {
        this.snackBar.open(error, 'Try again', {
          duration: 3000,
        });
      });
  }

  editLogin(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteLogin(id, comments) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        description: 'Do you really want to delete this?: ' + comments
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loginService.delete(id).subscribe(() => {
          this.snackBar.open('login deleted successfully', 'OK', {
            duration: 3000,
          });
          this.fetchLogins();
        }, (error) => {
          this.snackBar.open(error, 'Try again', {
            duration: 3000,
          });
        })
      }
    });
  }

  applyFilter(filterValue: string) {
    this.logins.filter = filterValue.trim().toLowerCase();
  }

}
