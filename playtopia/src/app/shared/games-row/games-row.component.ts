import { Component, Input } from '@angular/core';
import { game } from 'src/app/types/game';

@Component({
  selector: 'app-games-row',
  templateUrl: './games-row.component.html',
  styleUrls: ['./games-row.component.css'],
})
export class GamesRowComponent {
  @Input() games: game[] = [];
  @Input() isLoaded: boolean = false;
}
