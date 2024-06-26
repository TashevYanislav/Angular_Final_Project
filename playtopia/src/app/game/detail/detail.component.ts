import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cartGame, game, like } from 'src/app/types/game';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  game: game | null = null;
  user_id: string | null = localStorage.getItem('user_id');
  id: string | null = this.activeRoute.snapshot.paramMap.get('id');
  isLiked = false;
  isBought: boolean = false;
  like_id: string | null = '';
  cartGameId: string | null = '';
  isShown: boolean = false;
  isProceeded: boolean = false;
  likesCount = 0;

  constructor(
    public gameService: GameService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getCurrentGame(this.id).subscribe((data: game) => {
      this.game = data;
    });

    this.gameService.getLikes(this.id).subscribe((data: like[]) => {
      this.like_id = data.length > 0 ? data[0]._id : null;
      this.isLiked = data.some((like) => like._ownerId === this.user_id);
    });

    this.gameService.getLikesCount(this.id).subscribe((data: number) => {
      this.likesCount = data;
    });

    this.gameService
      .getAllGamesByUser(this.user_id)
      .subscribe((data: game[] | cartGame[]) => {
        this.isLiked = data.some((game) => game._ownerId === this.user_id);
      });

    this.refreshCart();

    // this.gameService.returnCartGame(this.user_id, this.cartGameId);
  }

  DeleteHandler(): void {
    this.isShown = true;
  }

  LikeHandler(): void {
    if (!this.isLiked && this.id) {
      this.gameService.likeGame(this.id).subscribe((response: like) => {
        this.like_id = response._id;
        this.fetchAndUpdateLikesCount();
      });

      this.isLiked = true;
    } else if (this.like_id) {
      this.gameService.deleteLikeGame(this.like_id).subscribe(() => {
        this.fetchAndUpdateLikesCount();
      });
      this.isLiked = false;
    }
  }

  fetchAndUpdateLikesCount(): void {
    if (this.id) {
      this.gameService.getLikesCount(this.id).subscribe((data: number) => {
        this.likesCount = data;
      });
    }
  }

  addToCartHandler(): void {
    if (this.game) {
      const currentGame = {
        gameName: this.game.game_name,
        gameGenre: this.game.genre,
        gameDescription: this.game.description,
        gameImage: this.game.game_img,
        gamePrice: this.game.price,
        details_id: this.game._id,
      };

      if (this.user_id) {
        this.gameService
          .addToCart(this.user_id, currentGame)
          .subscribe((cartGame) => {
            this.cartGameId = cartGame._id;
            this.refreshCart();
          });
      }
    }
  }
  removeFromCartHandler() {
    if (this.user_id) {
      this.gameService
        .deleteCartGame(this.cartGameId, this.user_id)
        .subscribe(() => {
          this.isBought = false;
          this.refreshCart();
        });
    }
    console.log(`Details Page ${this.isProceeded}`);
  }
  refreshCart() {
    this.gameService.getCartGame(this.user_id, this.id).subscribe((data) => {
      if (data.length > 0) {
        this.cartGameId = data[0]._id;
        this.isBought = true;
      } else {
        this.isBought = false;
      }
    });
  }
  onModalClosed(event: { isShown: boolean; isProceeded: boolean }) {
    this.isShown = event.isShown;
    this.isProceeded = event.isProceeded;
    if (this.id && this.isProceeded) {
      this.gameService.deleteGame(this.id).subscribe(() => {
        this.router.navigate(['/store']);
      });
    }
  }
}
