import { Component, input, signal, inject, OnInit } from '@angular/core';
import { Lesson } from '../../../../core/models/lesson.model';
import { LearningService } from '../../services/learning.service';
import { Question, Reply } from '../../../../core/models/qa.model';
import { Note } from '../../../../core/models/note.model';
import { FormsModule } from '@angular/forms';

type TabId = 'description' | 'qa' | 'notes' | 'resources';

@Component({
  selector: 'app-course-tabs',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="border-b border-slate-700 flex gap-4">
      @for (tab of tabs; track tab.id) {
        <button
          class="py-2 px-1 text-sm font-medium transition-colors"
          [class.text-sky-400]="activeTab() === tab.id"
          [class.text-slate-400]="activeTab() !== tab.id"
          [class.border-b-2]="activeTab() === tab.id"
          [class.border-sky-400]="activeTab() === tab.id"
          (click)="activeTab.set(tab.id)"
        >{{ tab.label }}</button>
      }
    </div>

    <div class="py-4">
      @if (activeTab() === 'description') {
        <div class="prose prose-invert max-w-none">
          <p>{{ lesson()?.description || 'Sin descripción.' }}</p>
        </div>
      }

      @if (activeTab() === 'qa') {
        <div class="space-y-4">
          <textarea [(ngModel)]="newQuestion" placeholder="Haz una pregunta..." class="w-full p-2 bg-slate-800 rounded"></textarea>
          <button (click)="postQuestion()" class="btn btn-primary text-sm">Preguntar</button>
          @for (q of questions(); track q.id) {
            <div class="border-l-2 border-slate-700 pl-3">
              <p class="text-white"><strong>{{ q.user.name }}</strong>: {{ q.content }}</p>
              <button (click)="replyTo(q.id)" class="text-xs text-sky-400">Responder</button>
              @if (replyingTo() === q.id) {
                <textarea [(ngModel)]="replyContent" class="w-full mt-2 p-1 bg-slate-800 rounded text-sm"></textarea>
                <button (click)="submitReply(q.id)" class="text-xs mt-1">Enviar</button>
              }
              @for (r of q.replies; track r.id) {
                <div class="ml-4 mt-2 text-sm"><strong>{{ r.user.name }}</strong>: {{ r.content }}</div>
              }
            </div>
          } @empty {
            <p class="text-slate-400">No hay preguntas aún.</p>
          }
        </div>
      }

      @if (activeTab() === 'notes') {
        <div>
          <div class="flex gap-2 mb-3">
            <input [(ngModel)]="newNoteContent" placeholder="Escribe una nota..." class="flex-1 p-2 bg-slate-800 rounded">
            <button (click)="addNote()" class="btn btn-primary text-sm">Guardar</button>
          </div>
          @for (note of notes(); track note.id) {
            <div class="bg-slate-800 p-2 rounded mb-2 flex justify-between">
              <span>{{ note.content }}</span>
              <button (click)="deleteNote(note.id)" class="text-red-400">✖</button>
            </div>
          }
        </div>
      }

      @if (activeTab() === 'resources') {
        <ul>
          @for (res of resources(); track res.id) {
            <li><a [href]="res.fileUrl" download class="text-sky-400">{{ res.title }} ({{ res.size }})</a></li>
          } @empty {
            <p>No hay recursos disponibles.</p>
          }
        </ul>
      }
    </div>
  `
})
export class CourseTabsComponent implements OnInit {
  lesson = input<Lesson | null>(null);
  private learningService = inject(LearningService);

  activeTab = signal<TabId>('description');
  tabs: { id: TabId; label: string }[] = [
    { id: 'description', label: 'Descripción' },
    { id: 'qa', label: 'Q&A' },
    { id: 'notes', label: 'Notas' },
    { id: 'resources', label: 'Recursos' }
  ];

  questions = signal<Question[]>([]);
  notes = signal<Note[]>([]);
  resources = signal<any[]>([]);
  newQuestion = '';
  newNoteContent = '';
  replyingTo = signal<string | null>(null);
  replyContent = '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const lessonId = this.lesson()?.id;
    if (!lessonId) return;
    this.learningService.getQuestions(lessonId).subscribe((q: Question[]) => this.questions.set(q));
    this.learningService.getNotes(lessonId).subscribe((n: Note[]) => this.notes.set(n));
    this.learningService.getResources(lessonId).subscribe((r: any[]) => this.resources.set(r));
  }

  postQuestion(): void {
    if (!this.newQuestion.trim()) return;
    this.learningService.postQuestion(this.lesson()!.id, this.newQuestion).subscribe((q: Question) => {
      this.questions.update(list => [q, ...list]);
      this.newQuestion = '';
    });
  }

  replyTo(questionId: string): void {
    this.replyingTo.set(questionId);
  }

  submitReply(questionId: string): void {
    this.learningService.postReply(questionId, this.replyContent).subscribe((reply: Reply) => {
      const updated = this.questions().map(q => {
        if (q.id === questionId) q.replies.push(reply);
        return q;
      });
      this.questions.set(updated);
      this.replyingTo.set(null);
      this.replyContent = '';
    });
  }

  addNote(): void {
    if (!this.newNoteContent.trim()) return;
    const note = { lessonId: this.lesson()!.id, content: this.newNoteContent, timestampSeconds: 0 };
    this.learningService.saveNote(note).subscribe((n: Note) => {
      this.notes.update(list => [n, ...list]);
      this.newNoteContent = '';
    });
  }

  deleteNote(noteId: string): void {
    this.learningService.deleteNote(noteId).subscribe(() => {
      this.notes.update(list => list.filter(n => n.id !== noteId));
    });
  }
}