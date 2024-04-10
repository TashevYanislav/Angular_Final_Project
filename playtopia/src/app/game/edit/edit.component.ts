import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  id: string | null = this.activeRoute.snapshot.paramMap.get('id');
  game: any | null = {};

  ngOnInit(): void {
    console.log(this.id);
    this.gameService.getCurrentGame(this.id).subscribe((data) => {
      this.game = data;
    });
  }

  formSubmitHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.reset();
      return;
    }

    this.gameService.editGame(this.id, form.value).subscribe();
    this.router.navigate([`/details/${this.id}`]);
  }
}
