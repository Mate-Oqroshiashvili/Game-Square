import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly localStorageKey = 'selectedItemId';

  get selectedItemId(): number | null {
    const storedValue = localStorage.getItem(this.localStorageKey);
    return storedValue ? +storedValue : null;
  }

  set selectedItemId(value: number | null) {
    if (value !== null) {
      localStorage.setItem(this.localStorageKey, value.toString());
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }
}
