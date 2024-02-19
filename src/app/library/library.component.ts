import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../theme.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlertService } from '../sweet-alert.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgIf,
    NgxPaginationModule,
    NgOptimizedImage,
  ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css', './responsive.css'],
})
export class LibraryComponent implements OnInit {
  libraryArray: any[] = [];
  lightTheme: boolean | undefined;
  isNull: boolean = false;

  pageSize = 20;
  currentPage = 1;
  items = this.libraryArray.length;

  constructor(
    public libraryService: LibraryService,
    private dataService: DataService,
    private router: Router,
    private themeService: ThemeService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.loadLibraryData();

    this.themeService.themeToggle$.subscribe(() => {
      this.loadLibraryData();
    });
  }

  loadLibraryData() {
    this.libraryArray = this.libraryService.getLibrary();

    if (this.libraryArray.length === 0) {
      this.isNull = true;
    } else {
      this.isNull = false;
    }

    this.checkTheme();
  }

  checkTheme() {
    this.lightTheme = localStorage.getItem('theme') === 'true';
  }

  removeFromLibrary(gameId: number) {
    this.sweetAlertService.showAlert(
      'Removing game from library...',
      'Game successfully removed from library.',
      'success'
    );
    this.libraryService.removeFromLibrary(gameId);
    this.loadLibraryData();
  }

  onButtonClick(itemId: number): void {
    this.dataService.selectedItemId = itemId;
    this.router.navigate(['store/moreInfo']);
    window.scrollTo(0, 0);
  }

  onPaginationClick(event: number): void {
    this.currentPage = event;
    window.scrollTo(0, 0);
  }
}
