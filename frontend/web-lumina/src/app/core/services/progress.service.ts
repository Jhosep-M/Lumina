// src/app/core/services/progress.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseProgress, LessonProgress } from '../models/course-progress.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Cache de progreso actual (por curso)
  private currentProgress = signal<CourseProgress | null>(null);

  // Porcentaje completo (signal computada)
  percentage = computed(() => this.currentProgress()?.percentageComplete ?? 0);

  /**
   * Carga el progreso de un curso desde el backend o localStorage (mock)
   */
  loadProgress(courseId: string): Promise<CourseProgress> {
    // Mock: primero intenta leer de localStorage
    const stored = localStorage.getItem(`progress_${courseId}`);
    if (stored) {
      const progress = JSON.parse(stored);
      this.currentProgress.set(progress);
      return Promise.resolve(progress);
    }
    // Si no existe, crea progreso vacío
    const emptyProgress: CourseProgress = {
      courseId,
      lessons: [],
      lastAccessedLessonId: '',
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      percentageComplete: 0,
    };
    this.saveProgress(emptyProgress);
    return Promise.resolve(emptyProgress);
  }

  /**
   * Guarda el progreso (localStorage + API)
   */
  saveProgress(progress: CourseProgress): void {
    // Recalcular porcentaje
    progress.percentageComplete = this.calculatePercentage(progress);
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(`progress_${progress.courseId}`, JSON.stringify(progress));
    this.currentProgress.set(progress);
    // Aquí harías un PUT a /api/progress si tienes backend
  }

  /**
   * Actualiza el progreso de una lección
   */
  updateLessonProgress(
    courseId: string,
    lessonId: string,
    lastPositionSeconds: number,
    completed?: boolean
  ): void {
    let progress = this.currentProgress();
    if (!progress) return;

    const existing = progress.lessons.find(l => l.lessonId === lessonId);
    if (existing) {
      existing.lastPositionSeconds = lastPositionSeconds;
      if (completed !== undefined) existing.completed = completed;
    } else {
      progress.lessons.push({
        lessonId,
        lastPositionSeconds,
        completed: completed ?? false,
      });
    }
    this.saveProgress(progress);
  }

  /**
   * Marca una lección como completada automáticamente cuando se alcanza el 95% del video
   */
  markLessonCompletedIfNeeded(lesson: LessonProgress, durationSeconds: number): boolean {
    if (!lesson.completed && lesson.lastPositionSeconds / durationSeconds >= 0.95) {
      lesson.completed = true;
      lesson.completedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  private calculatePercentage(progress: CourseProgress): number {
    if (!progress.lessons.length) return 0;
    const completedCount = progress.lessons.filter(l => l.completed).length;
    return Math.floor((completedCount / progress.lessons.length) * 100);
  }

  // Obtener última posición de una lección
  getLessonProgress(lessonId: string): number {
    const progress = this.currentProgress();
    return progress?.lessons.find(l => l.lessonId === lessonId)?.lastPositionSeconds ?? 0;
  }
}