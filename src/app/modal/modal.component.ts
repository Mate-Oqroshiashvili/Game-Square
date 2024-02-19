import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../auth-guard.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(
    public modalService: NgbModal,
    public auth: AuthGuardService,
    private router: Router
  ) {}

  closeModal() {
    if (!this.auth.isLoggedIn) {
      this.modalService.dismissAll();
    }
  }

  goToLogin() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
      window.scrollTo(0, 0);
      this.modalService.dismissAll();
    }
  }

  goToRegister() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['register']);
      window.scrollTo(0, 0);
      this.modalService.dismissAll();
    }
  }
}
