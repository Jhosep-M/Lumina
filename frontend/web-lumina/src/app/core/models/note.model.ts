// note.model.ts
export interface Note {
  id: string;
  lessonId: string;
  content: string;
  timestampSeconds: number;   // timestamp del video al que se asocia
  createdAt: string;
  updatedAt: string;
}
