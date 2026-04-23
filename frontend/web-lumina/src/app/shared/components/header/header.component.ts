// header.component.ts
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProfileDropdownComponent } from "../profile-dropdown/profile-dropdown.component";

interface MenuItem {
  label: string;
  route: string;
  exact: boolean;
  indicator?: boolean;   // punto rojo (En vivo)
  highlight?: boolean;   // color dorado (Premium)
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchBarComponent, ProfileDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Estados del menú
  isMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  // Datos del usuario (puedes convertir esto a un Signal o Input en el futuro si viene de un servicio)
  userInitials = 'EM';

  menuItems: MenuItem[] = [
    { label: 'Cursos',   route: '/courses',  exact: true  },
    { label: 'Rutas',    route: '/paths',    exact: false },
    { label: 'Escuelas', route: '/schools',  exact: false },
    { label: 'Empresas', route: '/business', exact: false },
    { label: 'Trabajos', route: '/jobs',     exact: false },
    { label: 'En vivo',  route: '/live',     exact: false, indicator: true  },
    { label: 'Premium',  route: '/premium',  exact: false, highlight: true  },
  ];

  // Métodos de navegación móvil
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  // Métodos de perfil
  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(v => !v);
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  onSearch(term: string): void {
    console.log('Buscando:', term);
  }
}