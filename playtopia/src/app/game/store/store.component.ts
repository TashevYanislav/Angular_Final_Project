import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: any[] = [];
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(
      (data: any) => {
        this.games = data;
      },
      (error) => {
        console.error('Error occurred while fetching games:', error);
      }
    );
  }
  getAllHandler() {
    this.gameService.getAllGames().subscribe(
      (data: any) => {
        this.games = data;
      },
      (error) => {
        console.error('Error occurred while fetching games:', error);
      }
    );
  }

  getGameByGenreHandler(genre: string) {
    this.games = []; // Clear the games array
    this.gameService.getGamesByGenre(genre).subscribe(
      (data: any) => {
        this.games = data;
      },
      (error) => {
        console.error('Error occurred while fetching games by genre:', error);
      }
    );
  }

  searchHandler(searchParams: string | null) {
    this.gameService.searchGame(searchParams).subscribe(
      (data: any) => {
        this.games = data;
      },
      (error) => {
        console.error('Error occurred while fetching games by genre:', error);
      }
    );
  }
}
