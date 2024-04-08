import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  game: any = null;
  user_id = localStorage.getItem('user_id');
  constructor(
    public gameService: GameService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: string | null = this.activeRoute.snapshot.paramMap.get('id');
    this.gameService.getCurrentGame(id).subscribe((data: any) => {
      this.game = data;
    });
  }
}
