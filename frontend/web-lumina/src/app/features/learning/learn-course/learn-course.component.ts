// learn-course/learn-course.component.ts
import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningService, CourseStructure, Module } from '../services/learning.service';
import { ProgressService } from '../../../core/services/progress.service';
import { CourseProgress } from '../../../core/models/course-progress.model';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LessonSidebarComponent as LessonSidebarComponent } from "../component/lesson-sidebar/lesson-sidebar.component";
import { CourseTabsComponent as CourseTabsComponent } from "../component/course-tabs/course-tabs.component";
import { VideoPlayerComponent as VideoPlayerComponent } from "../component/video-player/video-player.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learn-course',
  standalone: true,
  imports: [VideoPlayerComponent, LessonSidebarComponent, CourseTabsComponent, CommonModule],
  template: `
    <div class="flex h-screen bg-slate-950 text-white">
      <!-- Sidebar izquierda -->
      <app-lesson-sidebar
        [courseTitle]="courseTitle()"
        [modules]="modules()"
        [progress]="progress()"
        [selectedLessonId]="selectedLessonId()"
        (selectLesson)="changeLesson($event)"
      />

      <!-- Contenido principal -->
      <div class="flex-1 flex flex-col overflow-auto">
        <!-- Barra de progreso animada superior -->
        <div class="h-1 bg-slate-800">
          <div class="h-full bg-sky-500 transition-all duration-300" [style.width.%]="progressPercent()"></div>
        </div>

        <!-- Reproductor -->
        <div class="p-4">
          <app-video-player
            [videoUrl]="currentVideoUrl()"
            [subtitlesUrl]="currentSubtitlesUrl()"
            [lastPositionSeconds]="lastPosition()"
            (timeUpdate)="onTimeUpdate($event)"
            (videoEnded)="onVideoEnded()"
          />
        </div>

        <!-- Tabs de contenido -->
        <div class="px-4 pb-4">
          <app-course-tabs [lesson]="currentLesson()" />
        </div>

        <!-- Certificado (aparece cuando curso completado) -->
        @if (showCertificate()) {
          <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in-down">
            <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl text-center max-w-md">
              <div class="text-6xl animate-bounce">🎉</div>
              <h2 class="text-2xl font-bold mt-4">¡Felicidades!</h2>
              <p class="text-slate-300 mt-2">Has completado el curso "{{ courseTitle() }}"</p>
              <button (click)="downloadCertificate()" class="btn btn-primary mt-6">Descargar Certificado</button>
              <button (click)="closeCertificate()" class="btn btn-ghost mt-2">Cerrar</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
  `]
})
export class LearnCourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private learningService = inject(LearningService);
  private progressService = inject(ProgressService);
  private sanitizer = inject(DomSanitizer);

  courseId!: string;
  courseStructure = signal<CourseStructure | null>(null);
  modules = computed(() => this.courseStructure()?.modules ?? []);
  courseTitle = computed(() => this.courseStructure()?.title ?? '');

  allLessons = computed(() => this.modules().flatMap(m => m.lessons));
  selectedLessonId = signal<string>('');
  currentLesson = computed(() => this.allLessons().find(l => l.id === this.selectedLessonId()) ?? null);
  currentVideoUrl = computed(() => this.currentLesson()?.videoUrl ?? '');
  currentSubtitlesUrl = computed(() => this.currentLesson()?.subtitlesUrl);
  lastPosition = signal(0);

  progress = signal<CourseProgress | null>(null);
  progressPercent = computed(() => this.progress()?.percentageComplete ?? 0);
  showCertificate = signal(false);

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    if (!this.courseId) {
      this.router.navigate(['/courses']);
      return;
    }
    this.loadCourseData();
  }

  async loadCourseData(): Promise<void> {
    this.learningService.getCourseStructure(this.courseId).subscribe(async struct => {
      this.courseStructure.set(struct);
      const progress = await this.progressService.loadProgress(this.courseId);
      this.progress.set(progress);
      // Restaurar última lección vista
      const lastLessonId = progress.lastAccessedLessonId || this.allLessons()[0]?.id;
      if (lastLessonId) this.changeLesson(lastLessonId);
    });
  }

  changeLesson(lessonId: string): void {
    this.selectedLessonId.set(lessonId);
    const pos = this.progressService.getLessonProgress(lessonId);
    this.lastPosition.set(pos);
    // Actualizar última lección accedida en el progreso
    const prog = this.progress();
    if (prog && prog.lastAccessedLessonId !== lessonId) {
      prog.lastAccessedLessonId = lessonId;
      this.progressService.saveProgress(prog);
    }
  }

  onTimeUpdate(seconds: number): void {
    const lesson = this.currentLesson();
    if (!lesson) return;
    this.lastPosition.set(seconds);
    // Guardar cada 5 segundos (throttle, pero simplificamos)
    this.progressService.updateLessonProgress(this.courseId, lesson.id, seconds);
    // Verificar si completó la lección
    const prog = this.progress()!;
    const lessonProgress = prog.lessons.find(l => l.lessonId === lesson.id);
    if (lessonProgress && this.progressService.markLessonCompletedIfNeeded(lessonProgress, lesson.durationSeconds)) {
      this.progressService.saveProgress(prog);
      // Recalcular porcentaje global y mostrar certificado si 100%
      if (prog.percentageComplete === 100) {
        this.showCertificate.set(true);
      }
    }
  }

  onVideoEnded(): void {
    // Marcar como completada si no se hizo automáticamente
    const lesson = this.currentLesson();
    if (lesson) {
      const prog = this.progress()!;
      const lessonProg = prog.lessons.find(l => l.lessonId === lesson.id);
      if (lessonProg && !lessonProg.completed) {
        lessonProg.completed = true;
        lessonProg.completedAt = new Date().toISOString();
        this.progressService.saveProgress(prog);
        if (prog.percentageComplete === 100) this.showCertificate.set(true);
      }
    }
  }

  downloadCertificate(): void {
    // Generar PDF simple (usando html2canvas + jspdf o backend)
    alert('Descargando certificado... (implementar generación PDF)');
  }

  closeCertificate(): void {
    this.showCertificate.set(false);
  }
}