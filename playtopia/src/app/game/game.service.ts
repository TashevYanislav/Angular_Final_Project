import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gameForm } from '../types/game';
import { Observable, forkJoin } from 'rxjs';

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

  editGame(id: string | null, formValue: any) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.put(`${this.URL}/games/${id}`, formValue, httpOptionsAuth);
  }

  likeGame(id: string | null) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post(`${this.URL}/likes`, { id }, httpOptionsAuth);
  }

  getLikes(id: string | null) {
    return this.http.get(
      `${this.URL}/likes?where=id%3D%22${id}%22`,
      this.httpOptions
    );
  }

  getLikesCount(id: string | null) {
    return this.http.get(
      `${this.URL}/likes?where=id%3D%22${id}%22&count`,
      this.httpOptions
    );
  }

  deleteLikeGame(id: string | null) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete(`${this.URL}/likes/${id}`, httpOptionsAuth);
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

  getMostPopular(topCount: number): Observable<{ [key: string]: number }> {
    let games: any[] = [];
    let gamesIdAndLike: { [key: string]: number } = {};

    return new Observable((observer) => {
      this.getAllGames().subscribe((data: any) => {
        games = data;

        // Create an array of observables for each HTTP request
        const observables = games.map((game) => {
          return this.getLikesCount(game._id);
        });

        // Wait for all HTTP requests to complete
        forkJoin(observables).subscribe((likesData: any[]) => {
          // Combine games with their corresponding likes count
          games.forEach((game, index) => {
            gamesIdAndLike[game._id] = likesData[index];
          });

          // Sort the games by likes count in descending order
          const sortedGamesArray = Object.entries(gamesIdAndLike).sort(
            (a, b) => b[1] - a[1]
          );

          // Get the top N games
          const topGames = sortedGamesArray.slice(0, topCount);

          // Convert top games array back to an object
          const topGamesObject = Object.fromEntries(topGames);

          observer.next(topGamesObject);
          observer.complete();
        });
      });
    });
  }

  getGamesByGenre(genre: string) {
    return this.http.get(`${this.URL}/games?where=genre%3D%22${genre}%22`);
  }

  addToCart(userId: string | null, game: any): Observable<any> {
    debugger;
    let token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post(`${this.URL}/${userId}`, game, httpOptionsAuth);
  }

  deleteCartGame(id: string, user_id: string | null) {
    let token = localStorage.getItem('token');
    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete(`${this.URL}/${user_id}/${id}`, httpOptionsAuth);
  }

  getAllGamesByUser(user_id: string | null) {
    return this.http.get(`${this.URL}/${user_id}`, this.httpOptions);
  }

  searchGame(searchParams: string | null) {
    console.log(searchParams);

    return this.http.get(
      `${this.URL}/games?where=game_name%20LIKE%20%22${searchParams}%22`
    );
  }
}
