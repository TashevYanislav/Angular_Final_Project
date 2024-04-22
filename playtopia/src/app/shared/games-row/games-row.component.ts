import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-games-row',
  templateUrl: './games-row.component.html',
  styleUrls: ['./games-row.component.css'],
})
export class GamesRowComponent {
  @Input() games: any[] = [];
  @Input() isLoaded: boolean = false;
}
