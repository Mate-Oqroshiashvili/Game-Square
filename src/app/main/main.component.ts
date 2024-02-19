import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [CardsComponent, RouterOutlet, CommonModule],
})
export class MainComponent implements OnInit {
  lightTheme: boolean | undefined;

  constructor(private themeService: ThemeService) {}

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
}
