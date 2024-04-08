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
  constructor(
    public gameService: GameService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getCurrentGame(this.id).subscribe((data: any) => {
      this.game = data;
    });
  }

  DeleteHangler() {
    this.gameService.deleteGame(this.id).subscribe();
    this.router.navigate(['/store']);
  }
  LikeHandler() {
    this.gameService.likeGame(this.id,this.user_id).subscribe(console.log);
  }
}
