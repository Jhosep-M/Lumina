import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div class="bg-linear-to-r from-blue-500 to-cyan-400 text-white py-3 px-4 relative">
        <div class="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold">🎉 Oferta por tiempo limitado</span>
            <span class="text-sm md:text-base">50% de descuento en todos los cursos</span>
            <div class="flex gap-1 md:gap-3 font-mono text-sm md:text-base bg-white/20 px-3 py-1 rounded-full">
              <span>{{ timeLeft.days }}d</span>
              <span>{{ timeLeft.hours }}h</span>
              <span>{{ timeLeft.minutes }}m</span>
              <span>{{ timeLeft.seconds }}s</span>
            </div>
          </div>
          <button 
            (click)="closeBanner()"
            class="text-white hover:text-gray-200 transition-colors absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    }
  `,
})
export class TopBannerComponent implements OnInit, OnDestroy {
  isVisible = signal(true);
  private targetDate = new Date();
  private intervalId: any;
  
  timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit() {
    // Configurar fecha objetivo (ejemplo: 7 días desde ahora)
    this.targetDate.setDate(this.targetDate.getDate() + 7);
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTimer() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.isVisible.set(false);
      clearInterval(this.intervalId);
      return;
    }

    this.timeLeft = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }

  closeBanner() {
    this.isVisible.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}