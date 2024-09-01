import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { signupValidators } from '../../shared/validators/signup.validators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { StepperComponent } from '../../shared/ui/stepper/stepper.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AlertErrorComponent,
    NgClass,
    ButtonComponent,
    StepperComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  isSubmitBtn: boolean = false;
  forgotPasswordDone: boolean = false;
  verifyResetCodeDone: boolean = false;
  resetPasswordDone: boolean = false;
  errorMsg: string = '';
  steps: any = 0;

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  //*form builder

  forgotPassword: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
  });

  verifyResetCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    newPassword: [null, signupValidators.password],
  });

  sendEmail() {
    this.isSubmitBtn = true;
    if (this.forgotPassword.valid) {
      this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
        next: (response) => {
          console.log(response);
          let email = this.forgotPassword.get('email')?.value;
          this.resetPassword.get('email')?.setValue(email);
          this.isSubmitBtn = false;
          this.forgotPasswordDone = true;
          this.steps = 1;
          localStorage.setItem('currentStep', this.steps.toString());
          localStorage.setItem('currentEmail', email);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.errorMsg = error.error.message;
          this.isSubmitBtn = false;
          this.forgotPasswordDone = false;
          this.verifyResetCodeDone = false;
          this.resetPasswordDone = false;
        },
      });
    } else {
      this.forgotPassword.markAllAsTouched();
      this.forgotPassword.get('rePassword')?.setValue('');
    }
  }
  verifyCode() {
    this.isSubmitBtn = true;
    if (this.verifyResetCode.valid) {
      this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isSubmitBtn = false;
          this.verifyResetCodeDone = true;
          this.steps = 2;
          localStorage.setItem('currentStep', this.steps.toString());
          this.errorMsg = '';
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.errorMsg = error.error.message;
          this.isSubmitBtn = false;
          this.verifyResetCodeDone = false;
        },
      });
    } else {
      this.verifyResetCode.markAllAsTouched();
      this.verifyResetCode.get('rePassword')?.setValue('');
    }
  }
  resetMyPassword() {
    this.isSubmitBtn = true;
    if (this.resetPassword.valid) {
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isSubmitBtn = false;
          this.resetPasswordDone = true;
          localStorage.setItem('token', response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
          this.steps = 3;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.errorMsg = error.error.message;
          this.isSubmitBtn = false;
          this.resetPasswordDone = false;
        },
      });
    } else {
      this.resetPassword.markAllAsTouched();
      this.resetPassword.get('rePassword')?.setValue('');
    }
  }

  ngOnInit() {
    this.steps = localStorage.getItem('currentStep') || 0;
    this.resetPassword
      .get('email')
      ?.setValue(localStorage.getItem('currentEmail'));
  }
  ngOnDestroy() {
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('currentStep');
  }
}
