import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  game: any = null;
  user_id = localStorage.getItem('user_id');
  id: string | null = this.activeRoute.snapshot.paramMap.get('id');
  isLiked: boolean = false;
  like_id: string | null = '';
  likesCount: number = 0;
  constructor(
    public gameService: GameService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getCurrentGame(this.id).subscribe((data: any) => {
      this.game = data;
    });
    this.gameService.getLikes(this.id).subscribe((data: any) => {
      data.filter((like: any) => {
        this.like_id = like._id;
      });
    });

    this.gameService.getLikes(this.id).subscribe((data: any) => {
      this.isLiked = data.some((like: any) => {
        return like._ownerId === this.user_id;
      });
    });

    this.gameService.getLikesCount(this.id).subscribe((data: any) => {
      this.likesCount = data;
    });
  }

  DeleteHangler() {
    this.gameService.deleteGame(this.id).subscribe();
    this.router.navigate(['/store']);
  }
  LikeHandler() {
    if (!this.isLiked) {
      this.gameService.likeGame(this.id).subscribe((response: any) => {
        this.like_id = response._id;
      });

      this.isLiked = true;
    } else {
      this.gameService.delteLikeGame(this.like_id).subscribe();
      this.isLiked = false;
    }
  }
}
