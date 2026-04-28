// features/codeforce-careers/codeforce-careers.component.ts
import {
  Component, ChangeDetectionStrategy, inject, signal, computed, OnInit, OnDestroy, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Subject, takeUntil, catchError, of } from 'rxjs';

import { JobOffer, JobFilters } from './models/job-offer.model';
import { JobOffersService } from './services/job-offers.service';
import { JobFiltersComponent } from './components/job-filters/job-filters.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobDetailModalComponent } from './components/job-detail-modal/job-detail-modal.component';

import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codeforce-careers',
  standalone: true,
  imports: [
    CommonModule,
    JobFiltersComponent,
    JobCardComponent,
    JobDetailModalComponent,
  ],
  providers: [JobOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-codeforge-dark">
      <!-- Hero header -->
      <div class="relative overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 bg-gradient-to-br from-codeforge-primary/10 via-indigo-500/5 to-transparent"></div>
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-codeforge-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div class="relative max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider rounded-full bg-codeforge-primary/10 text-codeforge-primary border border-codeforge-primary/20">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            CodeForce Careers
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Encuentra tu próximo
            <span class="bg-gradient-to-r from-codeforge-primary to-sky-300 bg-clip-text text-transparent">desafío tech</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Las mejores ofertas de trabajo en tecnología de empresas líderes en Latinoamérica. Filtra, explora y aplica.
          </p>
        </div>
      </div>

      <!-- Main content -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <!-- Filters -->
        <app-job-filters (filtersChange)="onFiltersChange($event)" />

        <!-- Loading state -->
        @if (isLoading() && offers().length === 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            @for (i of [1,2,3]; track i) {
              <div class="bg-codeforge-dark-light/70 rounded-2xl p-5 animate-pulse">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-white/5"></div>
                  <div class="flex-1"><div class="h-3 w-24 rounded bg-white/5 mb-2"></div><div class="h-2 w-32 rounded bg-white/5"></div></div>
                </div>
                <div class="h-5 w-3/4 rounded bg-white/5 mb-2"></div>
                <div class="h-3 w-1/2 rounded bg-white/5 mb-4"></div>
                <div class="h-12 rounded bg-white/5 mb-4"></div>
                <div class="flex gap-2"><div class="h-5 w-16 rounded bg-white/5"></div><div class="h-5 w-16 rounded bg-white/5"></div><div class="h-5 w-16 rounded bg-white/5"></div></div>
              </div>
            }
          </div>
        }

        <!-- Error state -->
        @if (hasError()) {
          <div class="flex flex-col items-center justify-center py-16">
            <svg class="w-16 h-16 text-rose-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
            <p class="text-slate-400 text-lg mb-2">Error al cargar ofertas</p>
            <button (click)="loadOffers()" class="px-4 py-2 text-sm font-medium rounded-xl bg-codeforge-primary/10 text-codeforge-primary hover:bg-codeforge-primary/20 transition-all">Reintentar</button>
          </div>
        }

        <!-- Empty state -->
        @if (!isLoading() && !hasError() && offers().length === 0) {
          <div class="flex flex-col items-center justify-center py-16">
            <svg class="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <p class="text-slate-400 text-lg mb-1">No se encontraron ofertas</p>
            <p class="text-slate-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
          </div>
        }

        <!-- Cards grid -->
        @if (offers().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            @for (offer of offers(); track offer.id) {
              <app-job-card
                [offer]="offer"
                (openDetail)="openDetail($event)"
                (likeToggle)="toggleLike($event)"
                (shareClick)="shareOffer($event)"
                (applyClick)="applyToOffer($event)"
              />
            }
          </div>
        }

        <!-- Load more -->
        @if (hasMore() && !isLoading()) {
          <div class="flex justify-center mt-8">
            <button
              (click)="loadMore()"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              Cargar más ofertas
            </button>
          </div>
        }

        @if (isLoading() && offers().length > 0) {
          <div class="flex justify-center mt-6">
            <div class="w-6 h-6 border-2 border-codeforge-primary/30 border-t-codeforge-primary rounded-full animate-spin"></div>
          </div>
        }
      </div>

      <!-- Detail modal -->
      @if (selectedOffer()) {
        <app-job-detail-modal
          [offer]="selectedOffer()"
          (closeModal)="closeDetail()"
          (applyClick)="applyToOffer($event)"
          (shareClick)="shareOffer($event)"
          (reportClick)="reportOffer($event)"
        />
      }
    </div>
  `,
})
export class CodeforceCareersComponent implements OnInit, OnDestroy {
  private readonly jobService = inject(JobOffersService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroy$ = new Subject<void>();

  readonly offers = signal<JobOffer[]>([]);
  readonly isLoading = signal(false);
  readonly hasError = signal(false);
  readonly hasMore = signal(false);
  readonly selectedOffer = signal<JobOffer | null>(null);

  private currentFilters: JobFilters = { search: '', employmentType: null, workModality: null, experienceLevel: null };
  private currentPage = 0;

  ngOnInit(): void {
    this.loadOffers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Carga ofertas desde el servicio mock */
  loadOffers(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.currentPage = 0;

    this.jobService.getOffers(this.currentFilters, this.currentPage).pipe(
      takeUntil(this.destroy$),
      catchError(() => {
        this.hasError.set(true);
        this.isLoading.set(false);
        return of({ data: [] as JobOffer[], hasMore: false });
      })
    ).subscribe(result => {
      this.offers.set(result.data);
      this.hasMore.set(result.hasMore);
      this.isLoading.set(false);
    });
  }

  /** Carga la siguiente página de ofertas */
  loadMore(): void {
    this.currentPage++;
    this.isLoading.set(true);

    this.jobService.getOffers(this.currentFilters, this.currentPage).pipe(
      takeUntil(this.destroy$),
      catchError(() => {
        this.isLoading.set(false);
        this.toast.error('Error al cargar más ofertas');
        return of({ data: [] as JobOffer[], hasMore: false });
      })
    ).subscribe(result => {
      this.offers.update(current => [...current, ...result.data]);
      this.hasMore.set(result.hasMore);
      this.isLoading.set(false);
    });
  }

  /** Aplica nuevos filtros y recarga las ofertas */
  onFiltersChange(filters: JobFilters): void {
    this.currentFilters = filters;
    this.loadOffers();
  }

  /** Abre el modal de detalle */
  openDetail(offer: JobOffer): void {
    this.selectedOffer.set(offer);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  /** Cierra el modal de detalle */
  closeDetail(): void {
    this.selectedOffer.set(null);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  /** Toggle like en una oferta */
  toggleLike(offer: JobOffer): void {
    this.jobService.toggleLike(offer.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(updated => {
      this.offers.update(list =>
        list.map(o => o.id === updated.id ? updated : o)
      );
      if (this.selectedOffer()?.id === updated.id) {
        this.selectedOffer.set(updated);
      }
    });
  }

  /** Comparte una oferta copiando el enlace al portapapeles */
  shareOffer(offer: JobOffer): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = `${window.location.origin}/codeforce-careers?offer=${offer.id}`;
      navigator.clipboard.writeText(url).then(() => {
        this.toast.success('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        this.toast.error('No se pudo copiar el enlace');
      });
    }
  }

  /** Aplica a una oferta, verificando autenticación */
  applyToOffer(offer: JobOffer): void {
    if (!this.auth.isAuthenticated()) {
      this.toast.warning('Inicia sesión para aplicar a esta oferta');
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/codeforce-careers' } });
      return;
    }

    this.jobService.applyToOffer(offer.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(updated => {
      this.offers.update(list =>
        list.map(o => o.id === updated.id ? updated : o)
      );
      if (this.selectedOffer()?.id === updated.id) {
        this.selectedOffer.set(updated);
      }
      this.toast.success('¡Postulación registrada! Redirigiendo...');
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.open(offer.applyUrl, '_blank'), 1500);
      }
    });
  }

  /** Reporta una oferta (simulado) */
  reportOffer(offer: JobOffer): void {
    if (isPlatformBrowser(this.platformId) && confirm('¿Estás seguro de que deseas reportar esta oferta?')) {
      this.toast.success('Reporte enviado. Nuestro equipo lo revisará. ¡Gracias!');
    }
  }
}
