import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterData } from 'src/app/types/user';
import { emailValidator } from 'src/app/shared/utils/email.validator';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game/game.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  token: string = '';
  user_id: string = '';
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService
  ) {}

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        re_password: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 're_password')],
      }
    ),
  });

  formSubmitHandler() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email } = this.registerForm.value;
    let password = this.registerForm.get('passGroup.password')?.value;

    const data: RegisterData = {
      username: username as string,
      email: email as string,
      password: password as string,
    };

    this.userService.register(data).subscribe(
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
        this.registerForm.reset();
      }
    );
    // this.gameService.returnCartGamesCount(this.user_id);
  }
}
