import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gameForm } from '../types/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  URL: string = 'http://localhost:3030/data';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  addGame(formValue: gameForm) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post(`${this.URL}/games`, formValue, httpOptionsAuth);
  }
  deleteGame(id: string | null) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete(`${this.URL}/games/${id}`, httpOptionsAuth);
  }
  editGame(id: string) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.put(`${this.URL}/games/${id}`, httpOptionsAuth);
  }
  likeGame(id: string | null, user_id: string | null) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post(
      `${this.URL}/likes`,
      { id, user_id },
      httpOptionsAuth
    );
  }
  getAllGames() {
    return this.http.get(`${this.URL}/games`, this.httpOptions);
  }
  getCurrentGame(id: string | null) {
    return this.http.get(`${this.URL}/games/${id}`, this.httpOptions);
  }

  getLatestFiveGames() {
    return this.http.get(
      `${this.URL}/games?sortBy=_createdOn desc&pageSize=5`,
      this.httpOptions
    );
  }

  getGamesByGenre(genre: string) {
    return this.http.get(`${this.URL}/games?where=genre%3D%22${genre}%22`);
  }

  searchGame(searchParams: string | null) {
    console.log(searchParams);

    return this.http.get(
      `${this.URL}/games?where=game_name%20LIKE%20%22${searchParams}%22`
    );
  }
}
