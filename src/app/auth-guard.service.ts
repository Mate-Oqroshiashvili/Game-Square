import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LibraryService } from './library.service';
import { BehaviorSubject } from 'rxjs';
import { SweetAlertService } from './sweet-alert.service';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private loggedInUser: User | null = null;
  authChanged$ = new BehaviorSubject<null>(null);

  isLoggedIn: boolean = this.isLocalStorageAvailable()
    ? JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
    : false;

  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) {
    this.loadLoggedInUserFromLocalStorage();
  }

  canActivate(): boolean {
    return this.isLoggedIn;
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private loadLoggedInUserFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const storedUserString = localStorage.getItem('loggedInUser');
      this.loggedInUser = storedUserString
        ? JSON.parse(storedUserString)
        : null;
    }
  }

  private saveLoggedInUserToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    }
  }

  private reloadLibrary(): void {
    this.authChanged$.next(null);
  }

  login(email: string, password: string): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    const storedUsersString = localStorage.getItem('users');

    if (!storedUsersString) {
      return false;
    }

    const storedUsers: User[] = JSON.parse(storedUsersString);

    const foundUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      this.loggedInUser = { email, password };
      this.saveLoggedInUserToLocalStorage();
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      this.reloadLibrary();
      return true;
    }

    return false;
  }

  logout(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    this.sweetAlertService.showAlert(
      'Logging out...',
      'User logged out successfully.',
      'info'
    );
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    this.saveLoggedInUserToLocalStorage();
    this.reloadLibrary();
    this.router.navigate(['']);
    window.scrollTo(0, 0);
  }

  getUserEmail(): string | null {
    return this.loggedInUser ? this.loggedInUser.email : null;
  }

  resetPassword(email: string, newPassword: string): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    const storedUsersString = localStorage.getItem('users');

    if (!storedUsersString) {
      return false;
    }

    const storedUsers: User[] = JSON.parse(storedUsersString);

    const userIndex = storedUsers.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      storedUsers[userIndex].password = newPassword;

      localStorage.setItem('users', JSON.stringify(storedUsers));

      return true;
    }

    return false;
  }
}
