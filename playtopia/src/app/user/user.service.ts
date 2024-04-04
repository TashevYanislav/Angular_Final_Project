import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData, RegisterData, onRegisterData } from '../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = 'http://localhost:3030/users';
  isLogedInBool: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  register(data: RegisterData) {
    return this.http
      .post<onRegisterData>(`${this.URL}/register`, data, this.httpOptions)
      .subscribe(
        (response) => {
          console.log('POST request was successful', response);
          const token = response.accessToken;
          localStorage.setItem('token', token);
          this.isLogedInBool = true;
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error occurred during POST request', error);
        }
      );
  }

  login(data: LoginData) {
    return this.http
      .post<onRegisterData>(`${this.URL}/login`, data, this.httpOptions)
      .subscribe(
        (response) => {
          console.log('POST request was successful', response);
          const token = response.accessToken;
          localStorage.setItem('token', token);
          this.isLogedInBool = true;
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error occurred during POST request', error);
        }
      );
  }
  logout() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token available for logout');
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token,
      }),
    };

    return this.http.get(`${this.URL}/logout`, httpOptions).subscribe(
      () => {
        console.log('Logout successful');
        localStorage.removeItem('token');
        this.isLogedInBool = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.isLogedInBool = true;
        console.error('Error occurred during logout', error);
      }
    );
  }
  isLogedin() {
    return this.isLogedInBool;
  }
}
