import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="relative w-full max-w-md">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (keyup.enter)="onSearch()"
        placeholder="Buscar cursos..."
        class="w-full bg-white/10 text-white placeholder:text-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <svg 
        class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300"
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      @if (searchTerm()) {
        <button 
          (click)="clearSearch()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }
    </div>
  `,
})
export class SearchBarComponent {
  searchTerm = signal('');
  search = output<string>();

  onSearch() {
    if (this.searchTerm().trim()) {
      this.search.emit(this.searchTerm());
    }
  }

  clearSearch() {
    this.searchTerm.set('');
  }
}