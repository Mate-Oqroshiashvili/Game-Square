import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private library: any[] = [];
  private localStorageKeyPrefix = 'gameLibrary_';
  private libraryUpdated$ = new BehaviorSubject<void>(undefined);

  constructor(private authGuardService: AuthGuardService) {
    this.initializeLibrary();
    this.subscribeToAuthChanges();
  }

  addToLibrary(game: any): void {
    const userEmail = this.authGuardService.getUserEmail();
    const key = this.generateLibraryKey(userEmail!);

    if (!this.isInLibrary(game.id)) {
      this.library.push(game);
      this.saveLibraryToLocalStorage(key);
      this.emitLibraryUpdated();
    }
  }

  removeFromLibrary(gameId: number): void {
    const userEmail = this.authGuardService.getUserEmail();
    const key = this.generateLibraryKey(userEmail!);

    const index = this.library.findIndex((game) => game.id === gameId);
    if (index !== -1) {
      this.library.splice(index, 1);
      this.saveLibraryToLocalStorage(key);
      this.emitLibraryUpdated();
    }
  }

  isInLibrary(gameId: number): boolean {
    return this.library.some((game) => game.id === gameId);
  }

  getLibrary(): any[] {
    return [...this.library];
  }

  private initializeLibrary(): void {
    const userEmail = this.authGuardService.getUserEmail();
    const key = this.generateLibraryKey(userEmail!);

    if (typeof localStorage !== 'undefined') {
      const storedLibrary = localStorage.getItem(key);
      this.library = storedLibrary ? JSON.parse(storedLibrary) : [];
    }
  }

  private saveLibraryToLocalStorage(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(this.library));
    }
  }

  private subscribeToAuthChanges(): void {
    this.authGuardService.authChanged$.subscribe(() =>
      this.initializeLibrary()
    );
  }

  private generateLibraryKey(userEmail: string): string {
    return `${this.localStorageKeyPrefix}${userEmail}`;
  }

  private emitLibraryUpdated(): void {
    this.libraryUpdated$.next();
  }
}
