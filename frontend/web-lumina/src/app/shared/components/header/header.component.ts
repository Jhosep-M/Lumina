import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
// Define la estructura de tus items
interface MenuItem {
  label: string;
  route: string;
  exact: boolean; // El '?' significa que es opcional al definirlo...
  indicator?: boolean;
  highlight?: string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  onSearch(term: string) {
    console.log('Buscando:', term);
    // Implementa navegación a resultados de búsqueda
  }
   menuItems: MenuItem[] = [
    { label: 'Cursos', route: '/courses', exact: true },
    { label: 'Rutas', route: '/paths', exact: false }, // Agrega exact: false donde falte
    { label: 'Escuelas', route: '/schools', exact: false },
    { label: 'Empresas', route: '/business', exact: false },
    { label: 'Trabajos', route: '/jobs', exact: false },
    { label: 'En vivo', route: '/live', exact: false, indicator: true },
    { label: 'Premium', route: '/premium', exact: false, highlight: '⭐' }
  ];
}