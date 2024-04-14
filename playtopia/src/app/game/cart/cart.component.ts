import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user_id: string | null = localStorage.getItem('user_id');
  cartGames: any[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getAllGamesByUser(this.user_id).subscribe(
      (data: any) => {
        this.cartGames = data;
      },
      (error) => {
        console.error('Error occurred while fetching games:', error);
      }
    );
  }
}
