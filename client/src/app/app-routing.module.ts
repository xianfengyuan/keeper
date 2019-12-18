import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent, EditComponent, ListComponent, LoginComponent, RegisterComponent } from './components';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: '', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
