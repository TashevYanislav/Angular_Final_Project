import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = 'http://localhost:3030/users';
  constructor(private http: HttpClient) {}

  register(data: UserData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(`${this.URL}/register`, data, httpOptions).subscribe(
      (response) => {
        console.log('POST request was successful', response);
      },
      (error) => {
        console.error('Error occurred during POST request', error);
      }
    );
  }
}
