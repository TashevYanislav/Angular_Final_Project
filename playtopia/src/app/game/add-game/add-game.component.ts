import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent {
  constructor() {}

  formSubmitHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }
    console.log(form.value);

    const { game_name, description, genre, price } = form.value;
  }
}
