import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../theme.service';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../sweet-alert.service';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './responsive.css'],
})
export class RegisterComponent implements OnInit {
  lightTheme: boolean | undefined;
  users: User[] = [];
  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    private sweetAlertService: SweetAlertService
  ) {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];

    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
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

  register() {
    if (this.registrationForm.invalid) {
      this.markAllFormControlsAsTouched();
      this.sweetAlertService.showAlert(
        'Oops!',
        'Please fill in all fields correctly.',
        'warning'
      );
      return;
    }

    const password = this.registrationForm.get('password')!.value;
    const repeatPassword = this.registrationForm.get('repeatPassword')!.value;

    if (password !== repeatPassword) {
      this.sweetAlertService.showAlert(
        'Oops!',
        'Passwords do not match.',
        'warning'
      );
      return;
    }

    const email = this.registrationForm.get('email')!.value;
    if (this.isEmailAlreadyUsed(email)) {
      this.sweetAlertService.showAlert(
        'Oops!',
        'This email is already in use. Please choose a different one.',
        'warning'
      );
      return;
    }

    this.performRegistration();
  }

  private markAllFormControlsAsTouched() {
    Object.values(this.registrationForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private performRegistration() {
    const newUser: User = {
      username: this.registrationForm.get('username')!.value,
      email: this.registrationForm.get('email')!.value,
      password: this.registrationForm.get('password')!.value,
    };

    this.users.push(newUser);

    localStorage.setItem('users', JSON.stringify(this.users));

    this.registrationForm.reset();
    this.sweetAlertService.showAlert(
      'Registering...',
      'You successfully registered.',
      'success'
    );
    this.router.navigate(['']);
    window.scrollTo(0, 0);
  }

  isEmailAlreadyUsed(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }
}
