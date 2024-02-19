import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', './responsive.css'],
  providers: [NgbActiveModal],
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  lightTheme: boolean | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthGuardService,
    private formBuilder: FormBuilder,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkTheme();

    this.themeService.themeToggle$.subscribe(() => {
      this.checkTheme();
    });
  }

  checkTheme() {
    if (typeof window !== 'undefined') {
      this.lightTheme = localStorage.getItem('theme') === 'true';
    }
  }

  resetPassword() {
    for (const controlName in this.resetPasswordForm.controls) {
      const control = this.resetPasswordForm.get(controlName);
      if (control) {
        control.markAsTouched();
        if (control.errors) {
          Swal.fire(
            'Oops!',
            'Please fill in all the required fields.',
            'warning'
          );
          return;
        }
      }
    }

    const { email, newPassword, repeatNewPassword } =
      this.resetPasswordForm.value;

    if (newPassword !== repeatNewPassword) {
      Swal.fire(
        'Oops!',
        'Passwords do not match. Please try again.',
        'warning'
      );
      return;
    }

    if (this.authService.resetPassword(email, newPassword)) {
      Swal.fire(
        'Reseting password...',
        'Password reseted successfully.',
        'success'
      );
      this.router.navigate(['login']);
      window.scrollTo(0, 0);
    } else {
      Swal.fire(
        'Oops!',
        'Failed to reset password. Please check your email and try again.',
        'error'
      );
    }
  }
}
