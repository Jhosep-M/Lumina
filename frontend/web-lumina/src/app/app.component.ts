// app.component.ts
// FIX: @Inject(PLATFORM_ID) es la API legacy de Angular.
//      Todo el proyecto usa inject() funcional (Angular 14+), este componente
//      era el único inconsistente. Unificamos al patrón moderno.
import { Component, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { TopBannerComponent } from './shared/components/top-banner/top-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TopBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly title = 'LUMINA';

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loading = document.querySelector('.loading') as HTMLElement | null;
      if (loading) loading.style.display = 'none';
    }
  }
}