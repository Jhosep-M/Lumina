// src/app/features/learning/services/learning.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Lesson, Resource } from '../../../core/models/lesson.model';
import { Question, Reply } from '../../../core/models/qa.model';
import { Note } from '../../../core/models/note.model';

// Interfaz para la estructura completa del curso (módulos + lecciones)
export interface CourseStructure {
  id: string;
  title: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

@Injectable({ providedIn: 'root' })
export class LearningService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Mock de datos (reemplazar por llamadas HTTP reales)
  getCourseStructure(courseId: string): Observable<CourseStructure> {
    // Aquí harías this.http.get<CourseStructure>(`${this.apiUrl}/courses/${courseId}/structure`)
    // Mock:
    const mock: CourseStructure = {
      id: courseId,
      title: 'Angular Avanzado',
      modules: [
        {
          id: 'mod1',
          title: 'Fundamentos',
          lessons: [
            {
              id: 'lec1',
              title: 'Introducción a Signals',
              durationSeconds: 360,
              videoUrl: 'assets/videos/sample.mp4', // reemplazar con URL real
              thumbnailUrl: '',
              order: 1,
              resources: [
                { id: 'r1', title: 'Código fuente', fileUrl: 'assets/resources/lec1.zip', type: 'zip', size: '2MB' }
              ]
            },
            {
              id: 'lec2',
              title: 'Reactive Forms vs Signals',
              durationSeconds: 480,
              videoUrl: 'assets/videos/sample2.mp4',
              order: 2
            }
          ]
        },
        {
          id: 'mod2',
          title: 'Performance',
          lessons: [
            {
              id: 'lec3',
              title: 'Change Detection OnPush',
              durationSeconds: 540,
              videoUrl: 'assets/videos/sample3.mp4',
              order: 3
            }
          ]
        }
      ]
    };
    return of(mock);
  }

  // Q&A
  getQuestions(lessonId: string): Observable<Question[]> {
    // GET /api/lessons/:lessonId/questions
    return of([]);
  }

  postQuestion(lessonId: string, content: string): Observable<Question> {
    // POST /api/lessons/:lessonId/questions
    return of({} as Question);
  }

  postReply(questionId: string, content: string): Observable<Reply> {
    // POST /api/questions/:questionId/replies
    return of({} as Reply);
  }

  // Notas
  getNotes(lessonId: string): Observable<Note[]> {
    return of([]);
  }

  saveNote(note: Partial<Note>): Observable<Note> {
    // POST /api/notes
    return of({} as Note);
  }

  deleteNote(noteId: string): Observable<void> {
    return of(void 0);
  }

  // Recursos
  getResources(lessonId: string): Observable<Resource[]> {
    return of([]);
  }
}