import { Component } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterData } from 'src/app/types/user';
import { emailValidator } from 'src/app/shared/utils/email.validator';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private fb: FormBuilder) {}

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
    const { username, email } = this.registerForm.value;
    let password = this.registerForm.get('passGroup.password')?.value;
    console.log(password);

    const data: RegisterData = {
      username: username as string,
      email: email as string,
      password: password as string,
    };
    if (this.registerForm.invalid) {
      console.log('invalid');

      return;
    }

    this.userService.register(data);
  }
}
