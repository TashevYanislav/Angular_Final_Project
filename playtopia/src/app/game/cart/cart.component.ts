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
  totalPrice: number = 0; // Initialize totalPrice
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
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
  }

  onDeleteHandler(id: string) {
    console.log('Clicked');
    this.gameService.deleteCartGame(id, this.user_id).subscribe(() => {
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

  calculateTotalPrice() {
    this.totalPrice = this.cartGames.reduce(
      (total, game) => total + game.gamePrice,
      0
    );
  }
}
