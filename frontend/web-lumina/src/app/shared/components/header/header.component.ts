// header.component.ts
// Archivo: frontend/web-lumina/src/app/shared/components/header/header.component.ts
//
// CAMBIOS vs. versión original:
//  1. Eliminado NgOptimizedImage — usaba ngSrc="assets/images/logo.svg" que NO existe
//     → causaba error Angular en runtime que rompía el header completo
//  2. Eliminado CommonModule — no se usa directamente; los @if/@for son sintaxis Angular nativa
//  3. Mantenida toda la lógica de signals y menú

import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

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
  imports: [RouterLink, RouterLinkActive, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = signal(false);

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

  onSearch(term: string): void {
    console.log('Buscando:', term);
    // TODO: router.navigate(['/search'], { queryParams: { q: term } })
  }
}