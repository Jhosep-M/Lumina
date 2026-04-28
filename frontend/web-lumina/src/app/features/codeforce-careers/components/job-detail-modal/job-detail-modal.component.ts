// features/codeforce-careers/components/job-detail-modal/job-detail-modal.component.ts
import { Component, ChangeDetectionStrategy, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffer } from '../../models/job-offer.model';
import {
  EMPLOYMENT_TYPE_LABELS, WORK_MODALITY_LABELS, EXPERIENCE_LEVEL_LABELS,
} from '../../models/job-constants';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';

@Component({
  selector: 'app-job-detail-modal',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (offer(); as job) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        (click)="closeModal.emit()"
      >
        <!-- Modal container -->
        <div
          class="relative w-full max-w-3xl max-h-[90vh] bg-codeforge-dark-light border border-white/10 rounded-2xl shadow-2xl overflow-y-auto animate-slide-up"
          (click)="$event.stopPropagation()"
        >
          <!-- Close button -->
          <button
            (click)="closeModal.emit()"
            class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- Header gradient -->
          <div class="relative bg-gradient-to-br from-codeforge-primary/20 via-indigo-500/10 to-transparent p-6 pb-4 border-b border-white/5">
            <div class="flex items-start gap-4">
              <img [src]="job.author.avatarUrl" [alt]="job.author.name" class="w-14 h-14 rounded-full ring-2 ring-codeforge-primary/30" />
              <div class="flex-1 min-w-0">
                <p class="text-base font-bold text-white">{{ job.author.name }}</p>
                <p class="text-sm text-slate-400">{{ job.author.username }} · {{ job.author.role }}</p>
                <p class="text-xs text-slate-500 mt-1">Publicado {{ job.createdAt | relativeDate }}</p>
              </div>
              @if (job.isFeatured) {
                <span class="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  Destacado
                </span>
              }
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-6">
            <!-- Title & Company -->
            <div>
              <h2 class="text-2xl font-bold text-white mb-2">{{ job.title }}</h2>
              <div class="flex items-center gap-3 text-sm text-slate-400">
                <img [src]="job.companyLogoUrl" [alt]="job.company" class="w-6 h-6 rounded" />
                <span class="font-semibold text-white">{{ job.company }}</span>
                <span class="text-slate-600">·</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>{{ job.location }}</span>
              </div>
            </div>

            <!-- Structured details -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Tipo</p>
                <p class="text-sm font-semibold text-codeforge-primary">{{ getEmploymentLabel(job.employmentType) }}</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Modalidad</p>
                <p class="text-sm font-semibold text-emerald-400">{{ getModalityLabel(job.workModality) }}</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Nivel</p>
                <p class="text-sm font-semibold text-violet-400">{{ getLevelLabel(job.experienceLevel) }}</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Salario</p>
                <p class="text-sm font-semibold text-amber-400">{{ job.salaryRange.min | number }}–{{ job.salaryRange.max | number }} {{ job.salaryRange.currency }}</p>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Descripción</h3>
              <p class="text-sm text-slate-300 leading-relaxed">{{ job.description }}</p>
            </div>

            <!-- Requirements -->
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Requisitos</h3>
              <ul class="space-y-2">
                @for (req of job.requirements; track req) {
                  <li class="flex items-start gap-2 text-sm text-slate-300">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ req }}
                  </li>
                }
              </ul>
            </div>

            <!-- Responsibilities -->
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Responsabilidades</h3>
              <ul class="space-y-2">
                @for (r of job.responsibilities; track r) {
                  <li class="flex items-start gap-2 text-sm text-slate-300">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-codeforge-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    {{ r }}
                  </li>
                }
              </ul>
            </div>

            <!-- Benefits -->
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Beneficios</h3>
              <ul class="space-y-2">
                @for (b of job.benefits; track b) {
                  <li class="flex items-start gap-2 text-sm text-slate-300">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                    {{ b }}
                  </li>
                }
              </ul>
            </div>

            <!-- Technologies -->
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Tecnologías</h3>
              <div class="flex flex-wrap gap-2">
                @for (tech of job.technologies; track tech) {
                  <span class="px-3 py-1 text-xs font-medium rounded-lg bg-codeforge-primary/10 text-codeforge-primary border border-codeforge-primary/20">{{ tech }}</span>
                }
              </div>
            </div>

            <!-- Stats -->
            <div class="flex flex-wrap items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
              <span class="flex items-center gap-1.5 text-sm text-slate-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                {{ job.stats.views | number }} vistas
              </span>
              <span class="flex items-center gap-1.5 text-sm text-slate-400">
                <svg class="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                {{ job.stats.likes }} likes
              </span>
              <span class="flex items-center gap-1.5 text-sm text-slate-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                {{ job.stats.comments }} comentarios
              </span>
              <span class="flex items-center gap-1.5 text-sm text-slate-400">
                <svg class="w-4 h-4 text-codeforge-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                {{ job.stats.applicants }} postulantes
              </span>
            </div>

            <!-- Comments section -->
            @if (job.comments.length > 0) {
              <div>
                <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-3">Comentarios ({{ job.comments.length }})</h3>
                <div class="space-y-3">
                  @for (comment of job.comments; track comment.id) {
                    <div class="flex gap-3 p-3 bg-white/[0.03] rounded-xl">
                      <img [src]="comment.author.avatarUrl" [alt]="comment.author.name" class="w-8 h-8 rounded-full" />
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-sm font-semibold text-white">{{ comment.author.name }}</span>
                          <span class="text-xs text-slate-500">{{ comment.createdAt | relativeDate }}</span>
                        </div>
                        <p class="text-sm text-slate-300">{{ comment.content }}</p>
                        <div class="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
                          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                          {{ comment.likes }}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Action buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
              <button
                (click)="applyClick.emit(job)"
                class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-codeforge-primary to-sky-400 text-codeforge-dark hover:shadow-lg hover:shadow-codeforge-primary/30 transition-all"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                Aplicar ahora
              </button>
              <button
                (click)="shareClick.emit(job)"
                class="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                Compartir
              </button>
              <button
                (click)="reportClick.emit(job)"
                class="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-white/5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: contents; }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out;
    }
    .animate-slide-up {
      animation: slideUp 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class JobDetailModalComponent {
  readonly offer = input.required<JobOffer | null>();
  readonly closeModal = output<void>();
  readonly applyClick = output<JobOffer>();
  readonly shareClick = output<JobOffer>();
  readonly reportClick = output<JobOffer>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  getEmploymentLabel(type: string): string {
    return EMPLOYMENT_TYPE_LABELS[type as keyof typeof EMPLOYMENT_TYPE_LABELS] ?? type;
  }

  getModalityLabel(type: string): string {
    return WORK_MODALITY_LABELS[type as keyof typeof WORK_MODALITY_LABELS] ?? type;
  }

  getLevelLabel(type: string): string {
    return EXPERIENCE_LEVEL_LABELS[type as keyof typeof EXPERIENCE_LEVEL_LABELS] ?? type;
  }
}
