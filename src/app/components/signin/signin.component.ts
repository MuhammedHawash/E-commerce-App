import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { signupValidators } from '../../shared/validators/signup.validators';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { confirmPassword } from '../../shared/utilities/confirm-password.utilities';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AlertErrorComponent,
    ReactiveFormsModule,
    NgClass,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isSubmitBtn: boolean = false;
  loginDone: boolean = false;
  errorMsg: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  //*form builder

  login: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    password: [null, signupValidators.password],
  });

  sendData() {
    this.isSubmitBtn = true;
    if (this.login.valid) {
      this._AuthService.signin(this.login.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('token', response.token);
            this._AuthService.saveUserData();

            this._Router.navigate(['/home']);
            console.log(response);
            this.isSubmitBtn = false;
            this.loginDone = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.errorMsg = error.error.message;
          this.isSubmitBtn = false;
          this.loginDone = false;
        },
      });
    } else {
      this.login.markAllAsTouched();
      this.login.get('rePassword')?.setValue('');
    }
  }
}
