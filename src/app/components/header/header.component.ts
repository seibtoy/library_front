import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    CartComponent,
    ModalWindowComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  searchValue = '';
  modalTitle = '';
  modalContent = '';
  isCartOpen: boolean = false;

  onSearch(): void {
    console.log('Пошук:', this.searchValue);
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logout(): void {
    this.authService.logout();
  }

  @ViewChild(ModalWindowComponent) modal!: ModalWindowComponent;

  openModal(title: string, content: string): void {
    this.modalTitle = title;
    this.modalContent = content;

    setTimeout(() => {
      this.modal.openModal();
    }, 0);
  }

  toggleCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.openModal(
        'Oops!',
        'Seems like you are not logged in. Please create an account or log in!'
      );
    } else {
      this.isCartOpen = !this.isCartOpen;
      document.body.classList.toggle('no-scroll');
    }
  }
}
