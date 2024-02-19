import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../auth-guard.service';
import { LoginComponent } from '../login/login.component';
import { ModalComponent } from '../modal/modal.component';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, FormsModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './responsive.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  lightTheme: boolean | undefined;

  constructor(
    private searchService: SearchService,
    public modalService: NgbModal,
    public auth: AuthGuardService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.lightTheme = localStorage.getItem('theme') === 'true';
    }
  }

  theme() {
    this.lightTheme = !this.lightTheme;
    localStorage.setItem('theme', this.lightTheme.toString());

    this.themeService.toggleTheme();
  }

  onSearchChange(searchTerm: string): void {
    this.searchService.setSearchTerm(searchTerm);
  }

  openModal() {
    if (!this.auth.isLoggedIn) {
      this.modalService.open(ModalComponent);
    }
  }

  logout() {
    this.auth.logout();
  }

  GoToLogin() {
    this.router.navigate(['login']);
    window.scrollTo(0, 0);
  }

  GoToRegister() {
    this.router.navigate(['register']);
    window.scrollTo(0, 0);
  }

  GoToLibrary() {
    this.router.navigate(['library']);
    window.scrollTo(0, 0);
  }

  GoToStore() {
    this.router.navigate(['store']);
    window.scrollTo(0, 0);
  }

  GoToHome() {
    this.router.navigate(['']);
    window.scrollTo(0, 0);
  }
}
