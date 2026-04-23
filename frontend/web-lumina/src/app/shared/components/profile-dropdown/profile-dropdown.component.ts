// src/app/shared/components/profile-dropdown/profile-dropdown.component.ts
import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-dropdown',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent {
  @Output() close = new EventEmitter<void>();

  // Datos del usuario (simulados, cámbialos por los reales de tu AuthService)
  user = {
    fullName: 'Emerson Raphael Mollo Isla',
    username: '@emersonraphaelmolloislae26',
    initials: 'EM'
  };

  // Estado del submenú de moneda
  showCurrencyMenu = false;

  // Opciones del menú principal
  menuItems = [
    { label: 'Tu perfil', icon: 'fas fa-user', route: '/profile' },
    { label: 'Tus estudios', icon: 'fas fa-graduation-cap', route: '/my-studies' },
    { label: 'Tus cursos', icon: 'fas fa-book-open', route: '/my-courses' },
    { label: 'Tus apuntes', icon: 'fas fa-pen-alt', route: '/my-notes' },
    { label: 'Ayuda', icon: 'fas fa-question-circle', route: '/help' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Navegar y cerrar el menú
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMenu();
  }

  // Acción para "Sube a premium"
  upgradeToPremium(): void {
    // Aquí implementas la lógica de upgrade
    console.log('Navegar a página de premium');
    this.closeMenu();
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout();  // tu método de logout
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  // Alternar submenú de moneda (evita que se cierre el dropdown principal)
  toggleCurrencyMenu(event: Event): void {
    event.stopPropagation();
    this.showCurrencyMenu = !this.showCurrencyMenu;
  }

  // Cambiar moneda (ejemplo)
  changeCurrency(currency: string): void {
    console.log(`Moneda cambiada a ${currency}`);
    // lógica para cambiar moneda (servicio de moneda)
    this.showCurrencyMenu = false;
  }

  // Cerrar el dropdown desde el padre (Header)
  closeMenu(): void {
    this.close.emit();
  }

  // Evitar que el clic dentro del dropdown lo cierre (manejado por ClickOutside)
  @HostListener('click', ['$event'])
  onClickInside(event: Event): void {
    event.stopPropagation();
  }
}