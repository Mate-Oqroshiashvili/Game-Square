import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeToggleSubject = new Subject<void>();
  themeToggle$ = this.themeToggleSubject.asObservable();

  toggleTheme() {
    this.themeToggleSubject.next();
  }
}
