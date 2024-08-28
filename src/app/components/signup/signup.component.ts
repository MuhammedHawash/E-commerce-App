import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utilities/confirm-password.utilities';
import { signupValidators } from '../../shared/validators/signup.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isSubmitBtn: boolean = false;
  registerDone: boolean = false;
  errorMsg: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  // register:FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, signupValidators.name),
  //     email: new FormControl(null, signupValidators.email),
  //     password: new FormControl(null, signupValidators.password),
  //     rePassword: new FormControl(''),
  //   },
  //   confirmPassword
  // );

  //*form builder

  register: FormGroup = this._FormBuilder.group(
    {
      name: [null, signupValidators.name],
      email: [null, signupValidators.email],
      password: [null, signupValidators.password],
      rePassword: [null, signupValidators.rePassword],
    },
    { validators: [confirmPassword] }
  );

  sendData() {
    this.isSubmitBtn = true;
    if (this.register.valid) {
      this._AuthService.signup(this.register.value).subscribe({
        next: (response) => {
          if ((response.message = 'success')) {
            this._Router.navigate(['signin']);
            console.log(response);
            this.isSubmitBtn = false;
            this.registerDone = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.errorMsg = error.error.message;
          this.isSubmitBtn = false;
          this.registerDone = false;
        },
      });
    } else {
      this.register.markAllAsTouched();
      this.register.get('rePassword')?.setValue('');
    }
  }
}
