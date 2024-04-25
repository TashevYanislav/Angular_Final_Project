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
  like_id: string | null = '';

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
  }

  DeleteHandler(): void {
    if (this.id) {
      this.gameService.deleteGame(this.id).subscribe(() => {
        this.router.navigate(['/store']);
      });
    }
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
          .subscribe(console.log);
        // this.gameService.getCartGamesCount(this.user_id).subscribe(console.log);
      }
    }
  }
}
