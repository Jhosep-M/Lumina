import { Component, input, Output, EventEmitter, computed } from '@angular/core';
import { Lesson } from '../../../../core/models/lesson.model';
import { Module } from '../../services/learning.service';
import { CourseProgress } from '../../../../core/models/course-progress.model';
import { TimeFormatPipe } from "../pipes/time-format.pipe";


@Component({
  selector: 'app-lesson-sidebar',
  standalone: true,
  imports: [TimeFormatPipe],
  template: `
    <div class="w-80 bg-slate-900 border-r border-slate-700 h-full overflow-y-auto">
      <div class="p-4 border-b border-slate-700">
        <h2 class="font-bold text-white">{{ courseTitle() }}</h2>
        <div class="mt-2 bg-slate-700 rounded-full h-2">
          <div class="bg-sky-500 h-2 rounded-full" [style.width.%]="progressPercentage()"></div>
        </div>
        <span class="text-xs text-slate-400 mt-1 block">{{ progressPercentage() }}% completado</span>
      </div>
      @for (module of modules(); track module.id) {
        <div class="border-b border-slate-800">
          <div class="px-4 py-2 font-semibold text-slate-300 text-sm bg-slate-800/50">
            {{ module.title }}
          </div>
          @for (lesson of module.lessons; track lesson.id) {
            <button
              (click)="selectLesson.emit(lesson.id)"
              class="w-full text-left px-4 py-2 hover:bg-slate-800 transition-colors flex justify-between items-center"
              [class.bg-slate-800]="selectedLessonId() === lesson.id"
            >
              <div class="flex items-center gap-2">
                @if (isLessonCompleted(lesson.id)) {
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                } @else {
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                  </svg>
                }
                <span class="text-sm text-slate-300">{{ lesson.title }}</span>
              </div>
              <span class="text-xs text-slate-500">{{ lesson.durationSeconds | timeFormat }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class LessonSidebarComponent {
  courseTitle = input('');
  modules = input<Module[]>([]);
  progress = input<CourseProgress | null>(null);
  selectedLessonId = input('');
  @Output() selectLesson = new EventEmitter<string>();

  progressPercentage = computed(() => this.progress()?.percentageComplete ?? 0);

  isLessonCompleted(lessonId: string): boolean {
    return this.progress()?.lessons.some((l: { lessonId: string; completed: any; }) => l.lessonId === lessonId && l.completed) ?? false;
  }
}