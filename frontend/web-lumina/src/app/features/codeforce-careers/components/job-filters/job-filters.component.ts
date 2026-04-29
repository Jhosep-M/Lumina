// features/codeforce-careers/components/job-filters/job-filters.component.ts
import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  JobFilters, EmploymentType, WorkModality, ExperienceLevel,
} from '../../models/job-offer.model';
import {
  EMPLOYMENT_TYPE_OPTIONS, WORK_MODALITY_OPTIONS, EXPERIENCE_LEVEL_OPTIONS,
} from '../../models/job-constants';

@Component({
  selector: 'app-job-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-codeforge-dark-light/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 mb-6">
      <div class="flex flex-wrap gap-3 items-end">

        <!-- Búsqueda -->
        <div class="flex-1 min-w-[220px]">
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Buscar</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              [(ngModel)]="filters.search"
              (ngModelChange)="emitFilters()"
              placeholder="Puesto, empresa o tecnología..."
              class="w-full bg-codeforge-dark border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-codeforge-primary/50 focus:border-codeforge-primary/50 transition-all"
            />
          </div>
        </div>

        <!-- Tipo de empleo -->
        <div class="min-w-[160px]">
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Tipo</label>
          <select
            [(ngModel)]="filters.employmentType"
            (ngModelChange)="emitFilters()"
            class="w-full bg-codeforge-dark border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-codeforge-primary/50 transition-all appearance-none cursor-pointer"
          >
            <option [ngValue]="null">Todos</option>
            @for (opt of employmentTypes; track opt.value) {
              <option [ngValue]="opt.value">{{ opt.label }}</option>
            }
          </select>
        </div>

        <!-- Modalidad -->
        <div class="min-w-[140px]">
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Modalidad</label>
          <select
            [(ngModel)]="filters.workModality"
            (ngModelChange)="emitFilters()"
            class="w-full bg-codeforge-dark border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-codeforge-primary/50 transition-all appearance-none cursor-pointer"
          >
            <option [ngValue]="null">Todas</option>
            @for (opt of modalities; track opt.value) {
              <option [ngValue]="opt.value">{{ opt.label }}</option>
            }
          </select>
        </div>

        <!-- Experiencia -->
        <div class="min-w-[140px]">
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Nivel</label>
          <select
            [(ngModel)]="filters.experienceLevel"
            (ngModelChange)="emitFilters()"
            class="w-full bg-codeforge-dark border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-codeforge-primary/50 transition-all appearance-none cursor-pointer"
          >
            <option [ngValue]="null">Todos</option>
            @for (opt of levels; track opt.value) {
              <option [ngValue]="opt.value">{{ opt.label }}</option>
            }
          </select>
        </div>

        <!-- Limpiar filtros -->
        @if (hasActiveFilters()) {
          <button
            (click)="clearFilters()"
            class="flex items-center gap-1.5 px-4 py-2.5 text-sm text-codeforge-primary hover:text-white bg-codeforge-primary/10 hover:bg-codeforge-primary/20 rounded-xl transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Limpiar
          </button>
        }
      </div>
    </div>
  `,
})
export class JobFiltersComponent {
  readonly filtersChange = output<JobFilters>();

  readonly employmentTypes = EMPLOYMENT_TYPE_OPTIONS;
  readonly modalities = WORK_MODALITY_OPTIONS;
  readonly levels = EXPERIENCE_LEVEL_OPTIONS;

  filters: JobFilters = {
    search: '',
    employmentType: null,
    workModality: null,
    experienceLevel: null,
  };

  emitFilters(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  hasActiveFilters(): boolean {
    return !!(this.filters.search || this.filters.employmentType || this.filters.workModality || this.filters.experienceLevel);
  }

  clearFilters(): void {
    this.filters = { search: '', employmentType: null, workModality: null, experienceLevel: null };
    this.emitFilters();
  }
}
