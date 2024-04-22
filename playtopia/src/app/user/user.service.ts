import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData, RegisterData, onRegisterData } from '../types/user';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = 'http://localhost:3030/users';
  isLogedInBool: boolean = false;
  token: string = '';
  user_id: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  register(data: RegisterData): Observable<onRegisterData> {
    return this.http
      .post<onRegisterData>(`${this.URL}/register`, data, this.httpOptions)
      .pipe(
        tap(() => {
          console.log('Registration successful');
          this.isLogedInBool = true; // Update isLogedInBool upon successful registration
        }),
        catchError((error) => {
          console.error('POST request failed:', error);
          return throwError(error.error.message || 'An unknown error occurred');
        })
      );
  }
  login(data: LoginData) {
    return this.http
      .post<onRegisterData>(`${this.URL}/login`, data, this.httpOptions)
      .pipe(
        tap(() => {
          console.log('Registration successful');
          this.isLogedInBool = true; // Update isLogedInBool upon successful registration
        }),
        catchError((error) => {
          console.error('POST request failed:', error);
          return throwError(error.error.message || 'An unknown error occurred');
        })
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
        localStorage.removeItem('user_id');
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
    console.log();

    return this.isLogedInBool;
  }
}
