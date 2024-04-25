import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game/game.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user_id: string | null = localStorage.getItem('user_id');
  cartGamesCount: number = 0;
  constructor(
    public userService: UserService,
    public gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.getCartGamesCount(this.user_id).subscribe((data) => {
      this.cartGamesCount = data;
      console.log(`CART GAMES: ${this.cartGamesCount}`);
    });
  }

  logoutHandler() {
    this.userService.logout();
  }
}
