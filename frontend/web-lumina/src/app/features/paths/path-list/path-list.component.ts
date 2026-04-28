// features/paths/path-list/path-list.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-path-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="page-container text-center py-24 px-4 md:px-8">
      <!-- Decorative background glow -->
      <div class="relative inline-block mb-8">
        <div class="absolute -inset-4 bg-sky-500/5 rounded-full blur-2xl"></div>
        <div class="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl
                    bg-sky-500/10 border border-sky-500/20 shadow-lg shadow-sky-500/5">
          <svg class="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0
                     011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0
                     0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
        </div>
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"
          style="text-wrap: balance;">
        Rutas de Aprendizaje
      </h1>
      <p class="text-slate-400 text-lg mt-3 max-w-lg mx-auto leading-relaxed">
        Estamos diseñando rutas estructuradas para llevarte de cero a experto.
        <span class="text-sky-400 font-medium">¡Muy pronto!</span>
      </p>

      <a routerLink="/courses"
         class="inline-flex items-center gap-2 mt-10 px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 active:scale-95 text-sm">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
        Explorar cursos disponibles
      </a>
    </div>
  `,
})
export class PathListComponent {}