import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}

  formSubmitHandler(form: NgForm) {
    const { username, email, password, repassword } = form.value;
    const URL: string = 'http://localhost:3030/users/register';
    const data = {
      username: username,
      email: email,
      password: password,
      repassword: repassword,
    };

    if (password !== repassword) {
      console.log("Passwords don't match");
      return;
    }

    if (form.invalid) {
      console.log('Form Invalid');

      return;
    }
    console.log(form.value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http.post(URL, data, httpOptions).subscribe(
      (response) => {
        console.log('POST request was successful', response);
      },
      (error) => {
        console.error('Error occurred during POST request', error);
      }
    );
  }
}
