import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserData } from 'src/app/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService) {}

  formSubmitHandler(form: NgForm) {
    const { username, email, password, repassword } = form.value;
    const data: UserData = {
      username: username,
      email: email,
      password: password,
    };

    if (password !== repassword) {
      console.log("Passwords don't match");
      form.reset();
      return;
    }

    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }
    console.log(form.value);

    this.userService.register(data);
  }
}
