import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  URL: string = 'http://localhost:3030/data/:collection';

  constructor(private http: HttpClientModule) {}

  addGame() {}
  deleteGame() {}
  editGame() {}
  getAllGames() {}
  getCurrentGame() {}
}
