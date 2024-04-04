import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent {
  constructor(private gameService: GameService) {}

  formSubmitHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }
    console.log(form.value);

    this.gameService.addGame(form.value);
  }
}
