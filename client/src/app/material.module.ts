import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
   imports: [
      CommonModule,
      MatBadgeModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDividerModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatNativeDateModule,
      MatOptionModule,
      MatPaginatorModule,
      MatRadioModule,
      MatSelectModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatToolbarModule,
      MatTooltipModule,
   ],
   exports: [
      MatBadgeModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDividerModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatNativeDateModule,
      MatOptionModule,
      MatPaginatorModule,
      MatRadioModule,
      MatSelectModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatToolbarModule,
      MatTooltipModule,
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }
