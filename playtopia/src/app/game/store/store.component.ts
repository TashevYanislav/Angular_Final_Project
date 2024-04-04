import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: any[] = [];
  constructor(private gameService: GameService) {}

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
}
