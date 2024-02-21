import { ThemeService } from './../theme.service';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { HttpClientModule } from '@angular/common/http';
import { TruncateTextPipe } from '../card/truncateText.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../auth-guard.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './responsive.css'],
  providers: [ProxyService],
  imports: [
    NgOptimizedImage,
    HttpClientModule,
    NgFor,
    CommonModule,
    TruncateTextPipe,
  ],
})
export class HomeComponent implements OnInit {
  newestData: any[] = [];
  popularData: any[] = [];
  activeSlideIndex: number = 0;
  activePopualarSlideIndex: number = 0;
  lightTheme: boolean | undefined;
  imageUrl: string = 'assets/Mate/PNG/Greeting_50.png';

  changeImageSource() {
    this.imageUrl = 'assets/Mate/PNG/Greeting-light_50.png';
  }

  constructor(
    private proxy: ProxyService,
    public modalService: NgbModal,
    public auth: AuthGuardService,
    private dataService: DataService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.viewMoreInfo();
    this.viewMorePopularInfo();

    this.checkTheme();

    this.themeService.themeToggle$.subscribe(() => {
      this.checkTheme();
    });
  }

  checkTheme() {
    if (typeof window !== 'undefined') {
      this.lightTheme = localStorage.getItem('theme') === 'true';
      if (this.lightTheme === true) {
        this.changeImageSource();
      } else {
        this.imageUrl = 'assets/Mate/PNG/Greeting_50.png';
      }
    }
  }

  viewMoreInfo(): void {
    this.proxy.newestGames().subscribe((data: any) => {
      this.newestData = data.slice(0, 6);
    });
  }

  setActiveSlideIndex(index: number) {
    this.activeSlideIndex = index;
  }

  updateActiveSlideIndex() {
    const activeSlideElement = document.querySelector('.carousel-item.active');
    if (activeSlideElement) {
      this.activeSlideIndex = Array.from(
        activeSlideElement.parentElement!.children
      ).indexOf(activeSlideElement);
    }
  }

  viewMorePopularInfo(): void {
    this.proxy.popularGames().subscribe((data: any) => {
      this.popularData = data.slice(0, 6);
    });
  }

  setActivePopularSlideIndex(index: number) {
    this.activePopualarSlideIndex = index;
  }

  updateActivePopularSlideIndex() {
    const activeSlideElement = document.querySelector('.item1.active');
    if (activeSlideElement) {
      this.activePopualarSlideIndex = Array.from(
        activeSlideElement.parentElement!.children
      ).indexOf(activeSlideElement);
    }
  }

  onButtonClick(itemId: number): void {
    this.dataService.selectedItemId = itemId;
    this.router.navigate(['store/moreInfo']);
    window.scrollTo(0, 0);
  }
}
