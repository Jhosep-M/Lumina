// features/codeforce-careers/components/job-card/job-card.component.ts
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffer } from '../../models/job-offer.model';
import { EMPLOYMENT_TYPE_LABELS, WORK_MODALITY_LABELS } from '../../models/job-constants';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RelativeDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      (click)="openDetail.emit(offer())"
      class="group relative bg-codeforge-dark-light/70 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden cursor-pointer
             hover:border-codeforge-primary/30 hover:shadow-lg hover:shadow-codeforge-primary/5
             transition-all duration-300 hover:-translate-y-1"
    >
      <!-- Featured badge -->
      @if (offer().isFeatured) {
        <div class="absolute top-3 right-3 z-10">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg shadow-amber-500/20">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Destacado
          </span>
        </div>
      }

      <div class="p-5">
        <!-- Author header -->
        <div class="flex items-center gap-3 mb-4">
          <img [src]="offer().author.avatarUrl" [alt]="offer().author.name"
               class="w-10 h-10 rounded-full ring-2 ring-white/10" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate">{{ offer().author.name }}</p>
            <p class="text-xs text-slate-500">{{ offer().author.username }} · {{ offer().createdAt | relativeDate }}</p>
          </div>
        </div>

        <!-- Job info -->
        <div class="mb-3">
          <h3 class="text-lg font-bold text-white group-hover:text-codeforge-primary transition-colors mb-1">
            {{ offer().title }}
          </h3>
          <div class="flex items-center gap-2 text-sm text-slate-400">
            <img [src]="offer().companyLogoUrl" [alt]="offer().company" class="w-5 h-5 rounded" />
            <span class="font-medium">{{ offer().company }}</span>
            <span class="text-slate-600">·</span>
            <span>{{ offer().location }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-400 leading-relaxed mb-4">
          {{ offer().description | truncate:120 }}
        </p>

        <!-- Tags row -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span class="px-2 py-0.5 text-[11px] font-medium rounded-md bg-codeforge-primary/15 text-codeforge-primary">
            {{ getEmploymentLabel(offer().employmentType) }}
          </span>
          <span class="px-2 py-0.5 text-[11px] font-medium rounded-md bg-emerald-500/15 text-emerald-400">
            {{ getModalityLabel(offer().workModality) }}
          </span>
          @for (tech of offer().technologies.slice(0, 4); track tech) {
            <span class="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/5 text-slate-400">
              {{ tech }}
            </span>
          }
          @if (offer().technologies.length > 4) {
            <span class="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/5 text-slate-500">
              +{{ offer().technologies.length - 4 }}
            </span>
          }
        </div>

        <!-- Stats row -->
        <div class="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-white/5">
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            {{ offer().stats.views | number }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            {{ offer().stats.likes }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            {{ offer().stats.comments }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            {{ offer().stats.shares }}
          </span>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-2" (click)="$event.stopPropagation()">
          <button
            (click)="likeToggle.emit(offer())"
            [class]="offer().isLiked
              ? 'flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition-all'
              : 'flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-rose-400 transition-all'"
          >
            <svg class="w-4 h-4" [attr.fill]="offer().isLiked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            {{ offer().stats.likes }}
          </button>
          <button
            (click)="openDetail.emit(offer())"
            class="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-codeforge-primary transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            {{ offer().stats.comments }}
          </button>
          <button
            (click)="shareClick.emit(offer())"
            class="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-codeforge-primary transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            Compartir
          </button>
          <button
            (click)="applyClick.emit(offer())"
            class="ml-auto flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-codeforge-primary to-sky-400 text-codeforge-dark hover:shadow-lg hover:shadow-codeforge-primary/25 transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            Aplicar
          </button>
        </div>
      </div>
    </article>
  `,
})
export class JobCardComponent {
  readonly offer = input.required<JobOffer>();
  readonly openDetail = output<JobOffer>();
  readonly likeToggle = output<JobOffer>();
  readonly shareClick = output<JobOffer>();
  readonly applyClick = output<JobOffer>();

  readonly employmentLabels = EMPLOYMENT_TYPE_LABELS;
  readonly modalityLabels = WORK_MODALITY_LABELS;

  getEmploymentLabel(type: string): string {
    return this.employmentLabels[type as keyof typeof this.employmentLabels] ?? type;
  }

  getModalityLabel(type: string): string {
    return this.modalityLabels[type as keyof typeof this.modalityLabels] ?? type;
  }
}
