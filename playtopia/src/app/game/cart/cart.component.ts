import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { cartGame } from 'src/app/types/game';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user_id: string | null = localStorage.getItem('user_id');
  cartGames: cartGame[] = [];
  totalPrice: number = 0; // Initialize totalPrice
  isShown: boolean = false;
  isProceeded: boolean = false;
  game_id: string = '';
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getAllGamesByUser(this.user_id).subscribe(
      (data: any) => {
        this.cartGames = data;
        // Calculate total price after fetching data
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error occurred while fetching games:', error);
      }
    );
  }

  onDeleteHandler(id: string) {
    this.isShown = true;
    this.game_id = id;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartGames.reduce(
      (total, game) => total + game.gamePrice,
      0
    );
  }
  onModalClosed(event: { isShown: boolean; isProceeded: boolean }) {
    this.isShown = event.isShown;
    this.isProceeded = event.isProceeded;

    if (this.isProceeded) {
      this.gameService
        .deleteCartGame(this.game_id, this.user_id)
        .subscribe(() => {
          this.gameService.getAllGamesByUser(this.user_id).subscribe(
            (data: any) => {
              this.cartGames = data;
              console.log(data);
              // Calculate total price after fetching data
              this.calculateTotalPrice();
            },
            (error) => {
              console.error('Error occurred while fetching games:', error);
            }
          );
        });
    }
  }
}
