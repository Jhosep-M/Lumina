export interface LessonProgress {
  lessonId: string;
  lastPositionSeconds: number;   // último segundo visto
  completed: boolean;             // si completó la lección (visto > 90% o marcado)
  completedAt?: string;
}

export interface CourseProgress {
  courseId: string;
  lessons: LessonProgress[];
  lastAccessedLessonId: string;
  startedAt: string;
  updatedAt: string;
  percentageComplete: number;     // calculado del lado cliente
}