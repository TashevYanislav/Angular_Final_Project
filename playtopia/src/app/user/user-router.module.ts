import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
