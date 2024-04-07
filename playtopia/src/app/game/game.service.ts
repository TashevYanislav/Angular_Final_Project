import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gameForm } from '../types/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  URL: string = 'http://localhost:3030/data';
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

  constructor(private http: HttpClient) {}

  addGame(formValue: gameForm) {
    return this.http.post(`${this.URL}/games`, formValue, this.httpOptionsAuth);
  }
  deleteGame() {}
  editGame() {}
  getAllGames() {
    return this.http.get(`${this.URL}/games`, this.httpOptions);
  }
  getCurrentGame() {}

  getLatestFiveGames() {
    return this.http.get(
      `${this.URL}/games?sortBy=_createdOn desc&pageSize=5`,
      this.httpOptions
    );
  }

  getGamesByGenre(genre: string) {
    return this.http.get(`${this.URL}/games?where=genre%3D%22${genre}%22`);
  }
}
