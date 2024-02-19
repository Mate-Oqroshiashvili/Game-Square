import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private filterSubject: BehaviorSubject<{
    platform: string;
    category: string;
    sortBy: string;
  }> = new BehaviorSubject<{
    platform: string;
    category: string;
    sortBy: string;
  }>({ platform: '', category: '', sortBy: '' });

  public searchTerm$: Observable<string> =
    this.searchTermSubject.asObservable();
  public filter$: Observable<{
    platform: string;
    category: string;
    sortBy: string;
  }> = this.filterSubject.asObservable();

  constructor() {}

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  clearSearchTerm(): void {
    this.searchTermSubject.next('');
  }

  setFilter(filter: {
    platform: string;
    category: string;
    sortBy: string;
  }): void {
    this.filterSubject.next(filter);
  }
}
