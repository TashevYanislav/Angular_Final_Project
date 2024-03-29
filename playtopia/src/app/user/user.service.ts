import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData, RegisterData } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = 'http://localhost:3030/users';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  register(data: RegisterData) {
    return this.http
      .post(`${this.URL}/register`, data, this.httpOptions)
      .subscribe(
        (response) => {
          console.log('POST request was successful', response);
        },
        (error) => {
          console.error('Error occurred during POST request', error);
        }
      );
  }

  login(data: LoginData) {
    return this.http
      .post(`${this.URL}/login`, data, this.httpOptions)
      .subscribe(
        (response) => {
          console.log('POST request was successful', response);
        },
        (error) => {
          console.error('Error occurred during POST request', error);
        }
      );
  }
}
