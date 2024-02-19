import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DataService } from '../data.service';
import { ProxyService } from '../proxy.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ThemeService } from '../theme.service';
import { TruncateTextPipe } from '../card/truncateText.pipe';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../library.service';
import { ModalComponent } from '../modal/modal.component';
import { AuthGuardService } from '../auth-guard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from '../sweet-alert.service';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    NgFor,
    TruncateTextPipe,
    RouterLink,
  ],
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css', './responsive.css'],
  providers: [ProxyService],
})
export class MoreInfoComponent implements OnInit {
  obj: any = {};
  id: number | null = 0;
  lightTheme: boolean | undefined;
  addedToLibrary: boolean = false;

  constructor(
    private dataService: DataService,
    private proxy: ProxyService,
    private themeService: ThemeService,
    private libraryService: LibraryService,
    private modalService: NgbModal,
    public auth: AuthGuardService,
    private sweetAlertService: SweetAlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.id = this.dataService.selectedItemId;
      if (this.id !== null) {
        this.viewMoreInfo(this.id);
        this.addedToLibrary = this.libraryService.isInLibrary(this.id);
      }

      this.checkTheme();

      this.themeService.themeToggle$.subscribe(() => {
        this.checkTheme();
      });
    }
  }

  checkTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.lightTheme = localStorage.getItem('theme') === 'true';
    }
  }

  viewMoreInfo(id: number): void {
    this.proxy.viewMoreInfo(id).subscribe({
      next: (data: any) => {
        this.obj = data;
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('HTTP request completed.');
      },
    });
  }

  addToLibrary() {
    const gameId = this.obj.id;

    if (!this.libraryService.isInLibrary(gameId)) {
      this.sweetAlertService.showAlert(
        'Adding game to library...',
        'Game successfully added to library.',
        'success'
      );
      this.libraryService.addToLibrary(this.obj);
      this.addedToLibrary = true;
    } else {
      this.sweetAlertService.showAlert(
        'Oops!',
        'Something went wrong. Game can not be added to library.',
        'error'
      );
      this.addedToLibrary = false;
    }
  }

  openModal() {
    if (!this.auth.isLoggedIn) {
      this.modalService.open(ModalComponent);
    }
  }
}
