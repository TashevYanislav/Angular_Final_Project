import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formSubmitHandler(form: NgForm) {
    const { username, email, password, repassword } = form?.value;

    if (form.invalid) {
      console.log('Form Invalid');

      return;
    }
    console.log(
      `username: ${username}  email: ${email}  password: ${password}  repassword: ${repassword}`
    );

    
  }
}
