export interface Lesson {
  id: string;
  title: string;
  description?: string;
  durationSeconds: number;   // duración en segundos
  videoUrl: string;
  thumbnailUrl?: string;
  subtitlesUrl?: string;      // URL del archivo VTT
  resources?: Resource[];
  isPreview?: boolean;        // si se puede ver sin inscribirse
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  fileUrl: string;
  type: 'pdf' | 'zip' | 'link';
  size?: string;
}