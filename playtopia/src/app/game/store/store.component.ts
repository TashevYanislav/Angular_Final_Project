import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { game } from 'src/app/types/game';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: game[] = [];
  isLoaded: boolean = false; // Initialize isLoaded variable to false

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.games = [];
    this.isLoaded = false; // Set isLoaded to false before loading data
    this.gameService.getAllGames().subscribe(
      (data: game[]) => {
        this.games = data;
        this.isLoaded = true; // Update isLoaded to true after data is loaded
      },
      (error) => {
        console.error('Error occurred while fetching games:', error);
        this.isLoaded = true; // Ensure isLoaded is set to true even on error
      }
    );
  }

  getAllHandler() {
    this.loadData(); // Reuse loadData method
  }

  getGameByGenreHandler(genre: string) {
    this.games = [];
    this.isLoaded = false; // Set isLoaded to false before loading data
    this.gameService.getGamesByGenre(genre).subscribe(
      (data: game[]) => {
        this.games = data;
        // Assign data to this.games first
        this.isLoaded = true; // Then set isLoaded to true after data is loaded
      },
      (error) => {
        console.error('Error occurred while fetching games by genre:', error);
        this.isLoaded = true; // Ensure isLoaded is set to true even on error
      }
    );
  }

  searchHandler(searchParams: string | null) {
    this.games = [];
    this.isLoaded = false; // Set isLoaded to false before loading data
    this.gameService.searchGame(searchParams).subscribe(
      (data: game[]) => {
        this.games = data;
        // Assign data to this.games first
        this.isLoaded = true; // Then set isLoaded to true after data is loaded
      },
      (error) => {
        console.error('Error occurred while fetching games by genre:', error);
        this.isLoaded = true; // Ensure isLoaded is set to true even on error
      }
    );
  }
}
