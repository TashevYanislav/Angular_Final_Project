import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/types/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  token: string = '';
  user_id: string = '';
  errorMessage: string = '';
  @ViewChild('LoginForm', { static: false }) loginForm!: NgForm;
  constructor(private userService: UserService, private router: Router) {}

  formSubmitHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }
    const { email, password } = form.value;
    const data: LoginData = {
      email: email,
      password: password,
    };

    console.log(form.value);

    this.userService.login(data).subscribe(
      (response) => {
        console.log('POST request was successful', response);
        this.token = response.accessToken;
        console.log(this.token);
        localStorage.setItem('token', this.token);
        this.user_id = response._id;
        localStorage.setItem('user_id', this.user_id);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error occurred during POST request', error);
        this.errorMessage = error;
        this.loginForm.reset();
      }
    );
  }
}
