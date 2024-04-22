import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  latestGames: any[] = [];
  popularGames: any[] = [];
  isLoaded: boolean = false;
  isLoadedPupolarGames: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.isLoadedPupolarGames = false;
    this.gameService.getLatestFiveGames().subscribe((data: any) => {
      this.latestGames = data;
      this.isLoaded = true;
    });
    this.gameService.getMostPopular(3).subscribe((topGamesObject) => {
      const gameIds = Object.keys(topGamesObject);
      const observables = gameIds.map((gameId) => {
        return this.gameService.getCurrentGame(gameId);
      });
      forkJoin(observables).subscribe((gamesData: any[]) => {
        this.popularGames = gamesData;
        console.log('Popular popularGames', this.popularGames);
        this.isLoadedPupolarGames = true;
      });
    });
  }
}
