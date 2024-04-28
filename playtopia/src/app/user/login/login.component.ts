import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/types/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game/game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  token: string = '';
  user_id: string = '';
  errorMessage: string = '';
  @ViewChild('LoginForm', { static: false }) loginForm!: NgForm;
  constructor(
    private userService: UserService,
    private router: Router,
    private gameService: GameService
  ) {}

  formSubmitHandler(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    const { email, password } = form.value;
    const data: LoginData = {
      email: email,
      password: password,
    };

    this.userService.login(data).subscribe(
      (response) => {
        this.token = response.accessToken;
        localStorage.setItem('token', this.token);
        this.user_id = response._id;
        localStorage.setItem('user_id', this.user_id);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error occurred during POST request', error);
        this.errorMessage = error;
        this.loginForm.reset();
      }
    );
    // this.gameService.returnCartGamesCount(this.user_id);
  }
}
