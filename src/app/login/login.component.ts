import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { ThemeService } from '../theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './responsive.css'],
  providers: [NgbActiveModal],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  lightTheme: boolean | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private auth: AuthGuardService,
    private router: Router,
    private themeService: ThemeService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

  login() {
    if (this.loginForm.invalid) {
      Swal.fire('Oops!', 'Please enter both mail and password.', 'warning');
      return;
    }

    const { mail, password } = this.loginForm.value;

    if (this.auth.login(mail, password)) {
      Swal.fire('Logging in...', 'You logged in successfully.', 'success');
      this.auth.isLoggedIn = true;
      this.router.navigate(['']);
      window.scrollTo(0, 0);
      this.activeModal.close(LoginComponent);
    } else {
      Swal.fire(
        'Oops!',
        'Invalid mail or password. Please try again.',
        'warning'
      );
      this.auth.isLoggedIn = false;
    }
  }
}
