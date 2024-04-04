import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gameForm } from '../types/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  URL: string = 'http://localhost:3030/data/:collection';
  token = localStorage.getItem('token');
  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': this.token || '',
    }),
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  addGame(formValue: gameForm) {
    this.http.post(this.URL, formValue, this.httpOptionsAuth).subscribe();
    this.router.navigate(['/store']);
  }
  deleteGame() {}
  editGame() {}
  getAllGames() {
    return this.http.get(this.URL, this.httpOptions);
  }
  getCurrentGame() {}
}
