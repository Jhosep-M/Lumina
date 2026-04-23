// src/app/shared/components/header/header.component.ts
import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../../core/services/auth.service';
//import { CommonModule } from '@angular/common'; // para NgIf, etc., pero Angular standalone ya lo tiene parcialmente; usamos @if

interface MenuItem {
  label: string;
  route: string;
  exact: boolean;
  indicator?: boolean;
  highlight?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SearchBarComponent,
    ProfileDropdownComponent,
    ClickOutsideDirective,
    // CommonModule no es necesario porque usamos @if, @for
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private auth = inject(AuthService);

  // Señal del usuario actual (puede ser null)
  currentUser = this.auth.currentUser;

  // Iniciales calculadas a partir del nombre del usuario
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user?.name) return '?';
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });

  isAuthenticated = this.auth.isAuthenticated;

  // Estados del menú
  isMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Cursos',   route: '/courses',  exact: true  },
    { label: 'Rutas',    route: '/paths',    exact: false },
    { label: 'Escuelas', route: '/schools',  exact: false },
    { label: 'Empresas', route: '/business', exact: false },
    { label: 'Trabajos', route: '/jobs',     exact: false },
    { label: 'En vivo',  route: '/live',     exact: false, indicator: true  },
    { label: 'Premium',  route: '/premium',  exact: false, highlight: true  },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(v => !v);
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  onSearch(term: string): void {
    console.log('Buscando:', term);
    // Aquí puedes implementar navegación a resultados de búsqueda
  }
}