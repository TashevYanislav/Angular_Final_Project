import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  formSubmitHandler(form: NgForm) {
    const { email, password } = form.value;
    const data: LoginData = {
      email: email,
      password: password,
    };

    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }
    console.log(form.value);

    this.userService.login(data);
  }
}
