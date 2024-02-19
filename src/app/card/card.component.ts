import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { HttpClientModule } from '@angular/common/http';
import { TruncateTextPipe } from './truncateText.pipe';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../auth-guard.service';
import { ThemeService } from '../theme.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', './responsive.css'],
  providers: [ProxyService, TruncateTextPipe],
  imports: [
    HttpClientModule,
    NgFor,
    NgxPaginationModule,
    TruncateTextPipe,
    RouterLink,
    CommonModule,
  ],
})
export class CardComponent implements OnInit {
  array: any[] = [];
  gameGenres: string[] = [
    'MMORPG',
    'Shooter',
    'Strategy',
    'Moba',
    'Racing',
    'Sports',
    'Social',
    'Sandbox',
    'Open-world',
    'Survival',
    'PVP',
    'PVE',
    'Pixel',
    'Voxel',
    'Zombie',
    'Rurn-Based',
    'First-Person',
    'Third-Person',
    'Top-Down',
    'Tank',
    'Space',
    'Sailing',
    'Side-Scroller',
    'Superhero',
    'Permadeath',
    'Card',
    'Battle-Royale',
    'MMO',
    'MMOFPS',
    'MMOTPS',
    '3D',
    '2D',
    'Anime',
    'Fantasy',
    'Sci-Fi',
    'Fighting',
    'Action-Rpg',
    'Action',
    'Military',
    'Martial-Arts',
    'Flight',
    'Low-Spec',
    'Tower-Defense',
    'Horror',
    'MMORTS',
  ].sort();

  pageSize = 20;
  currentPage = 1;
  items = this.array.length;
  id: number = 0;
  platform: string = '';
  category: string = '';
  sortBy: string = '';
  searchTerm: string = '';
  isNull: boolean = false;

  activeButton: string | null = 'button1';
  activeGenre: string | null = '';
  activeSort: string | null = 'sortButton4';
  lightTheme: boolean | undefined;

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }

  sortButton(buttonId: string) {
    this.activeSort = buttonId;
  }

  constructor(
    private proxy: ProxyService,
    private searchService: SearchService,
    public modalService: NgbModal,
    public auth: AuthGuardService,
    private themeService: ThemeService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.updateData();
    });

    this.searchService.filter$.subscribe((filter) => {
      this.platform = filter.platform;
      this.category = filter.category;
      this.sortBy = filter.sortBy;
      this.updateData();
    });

    this.checkTheme();

    this.themeService.themeToggle$.subscribe(() => {
      this.checkTheme();
    });
  }

  onButtonClick(itemId: number): void {
    this.dataService.selectedItemId = itemId;
    this.router.navigate(['store/moreInfo']);
    window.scrollTo(0, 0);
  }

  checkTheme() {
    if (typeof window !== 'undefined') {
      this.lightTheme = localStorage.getItem('theme') === 'true';
    }
  }

  updateData(): void {
    this.getData();
  }

  getData(): void {
    this.proxy
      .getInfo(this.platform, this.category, this.sortBy)
      .subscribe((data: any) => {
        this.array = this.filterAndSearchData(data);
        if (this.array.length == 0) {
          this.isNull = true;
        } else {
          this.isNull = false;
        }
      });
  }

  filterAndSearchData(data: any[]): any[] {
    if (!this.searchTerm) {
      return data;
    }

    return data.filter((item: any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
    this.searchService.clearSearchTerm();
    this.updateData();
  }

  selectPlatform(platform: string): void {
    this.platform = platform;
    this.currentPage = 1;
    this.getData();
  }

  selectGenre(genre: string): void {
    this.activeGenre = genre;
    this.category = genre.toLowerCase();
    this.currentPage = 1;
    this.getData();
  }

  selectChoice(choice: string): void {
    this.sortBy = choice;
    this.currentPage = 1;
    this.getData();
  }

  onPaginationClick(event: number): void {
    this.currentPage = event;
    window.scrollTo(0, 0);
  }
}
