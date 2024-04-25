import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { cartGame, game, gameForm, like } from '../types/game';

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

  addGame(formValue: gameForm): Observable<game> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post<game>(
      `${this.URL}/games`,
      formValue,
      httpOptionsAuth
    );
  }

  deleteGame(id: string | null): Observable<game> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete<game>(`${this.URL}/games/${id}`, httpOptionsAuth);
  }

  editGame(id: string | null, formValue: gameForm): Observable<gameForm> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.put<gameForm>(
      `${this.URL}/games/${id}`,
      formValue,
      httpOptionsAuth
    );
  }

  likeGame(id: string | null): Observable<like> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post<like>(`${this.URL}/likes`, { id }, httpOptionsAuth);
  }

  getLikes(id: string | null): Observable<like[]> {
    return this.http.get<like[]>(
      `${this.URL}/likes?where=id%3D%22${id}%22`,
      this.httpOptions
    );
  }

  getLikesCount(id: string | null): Observable<number> {
    return this.http.get<number>(
      `${this.URL}/likes?where=id%3D%22${id}%22&count`,
      this.httpOptions
    );
  }

  deleteLikeGame(id: string | null): Observable<game> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete<game>(`${this.URL}/likes/${id}`, httpOptionsAuth);
  }

  getAllGames(): Observable<game[]> {
    return this.http.get<game[]>(`${this.URL}/games`, this.httpOptions);
  }

  getCurrentGame(id: string | null): Observable<game> {
    return this.http.get<game>(`${this.URL}/games/${id}`, this.httpOptions);
  }

  getLatestFiveGames(): Observable<game[]> {
    return this.http.get<game[]>(
      `${this.URL}/games?sortBy=_createdOn desc&pageSize=5`,
      this.httpOptions
    );
  }

  getMostPopular(topCount: number): Observable<{ [key: string]: number }> {
    let games: game[] = [];
    let gamesIdAndLike: { [key: string]: number } = {};

    return new Observable((observer) => {
      this.getAllGames().subscribe((data: game[]) => {
        games = data;

        const observables = games.map((game) => {
          return this.getLikesCount(game._id);
        });

        forkJoin(observables).subscribe((likesData: number[]) => {
          games.forEach((game, index) => {
            gamesIdAndLike[game._id] = likesData[index];
          });

          const sortedGamesArray = Object.entries(gamesIdAndLike).sort(
            (a, b) => b[1] - a[1]
          );
          const topGames = sortedGamesArray.slice(0, topCount);
          const topGamesObject = Object.fromEntries(topGames);

          observer.next(topGamesObject);
          observer.complete();
        });
      });
    });
  }

  getGamesByGenre(genre: string): Observable<game[]> {
    return this.http.get<game[]>(
      `${this.URL}/games?where=genre%3D%22${genre}%22`
    );
  }

  addToCart(userId: string | null, game: any): Observable<cartGame> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.post<cartGame>(
      `${this.URL}/${userId}`,
      game,
      httpOptionsAuth
    );
  }

  deleteCartGame(id: string, user_id: string | null): Observable<cartGame> {
    const token = localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': token || '',
      }),
    };
    return this.http.delete<cartGame>(
      `${this.URL}/${user_id}/${id}`,
      httpOptionsAuth
    );
  }

  getAllGamesByUser(user_id: string | null): Observable<game[] | cartGame[]> {
    return this.http.get<game[] | cartGame[]>(
      `${this.URL}/${user_id}`,
      this.httpOptions
    );
  }

  getCartGamesCount(user_id: string | null): Observable<number> {
    return this.http.get<number>(
      `${this.URL}/${user_id}?count`,
      this.httpOptions
    );
  }

  searchGame(searchParams: string | null): Observable<game[]> {
    return this.http.get<game[]>(
      `${this.URL}/games?where=game_name%20LIKE%20%22${searchParams}%22`
    );
  }
}
