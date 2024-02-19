import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpClient) {}

  getInfo(platform: string, category: string, sortBy: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'ba7ca595a7msh4683beac9f36634p1c99ddjsn2dd7e72ddbb5',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    });

    let apiUrl: string = '';

    if (
      platform &&
      category &&
      sortBy &&
      platform != '' &&
      category != '' &&
      sortBy != ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&category=${category}&sort-by=${sortBy}`;
    } else if (
      platform &&
      platform != '' &&
      !category &&
      category == '' &&
      !sortBy &&
      sortBy == ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`;
    } else if (
      !platform &&
      platform == '' &&
      category &&
      category != '' &&
      !sortBy &&
      sortBy == ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    } else if (
      !platform &&
      platform == '' &&
      !category &&
      category == '' &&
      sortBy &&
      sortBy != ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}`;
    } else if (
      platform &&
      platform != '' &&
      category &&
      category != '' &&
      !sortBy &&
      sortBy == ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&category=${category}`;
    } else if (
      platform &&
      platform != '' &&
      sortBy &&
      sortBy != '' &&
      !category &&
      category == ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&sort-by=${sortBy}`;
    } else if (
      category &&
      category != '' &&
      sortBy &&
      sortBy != '' &&
      !platform &&
      platform == ''
    ) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}&sort-by=${sortBy}`;
    } else {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
    }

    return this.http.get(apiUrl, { headers });
  }

  viewMoreInfo(id: number) {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'ba7ca595a7msh4683beac9f36634p1c99ddjsn2dd7e72ddbb5',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    });

    let apiUrl: string = '';

    if (id && id !== 0) {
      apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    }

    return this.http.get(apiUrl, { headers });
  }

  newestGames() {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'ba7ca595a7msh4683beac9f36634p1c99ddjsn2dd7e72ddbb5',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    });

    let apiUrl: string =
      'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';

    return this.http.get(apiUrl, { headers });
  }

  popularGames() {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'ba7ca595a7msh4683beac9f36634p1c99ddjsn2dd7e72ddbb5',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    });

    let apiUrl: string =
      'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity';

    return this.http.get(apiUrl, { headers });
  }
}
