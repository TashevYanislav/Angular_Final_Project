import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, UserRoutingModule,FormsModule,HttpClientModule ,ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class UserModule {}
