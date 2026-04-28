// features/paths/models/learning-path.model.ts

export interface LearningPath {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;           // emoji or SVG path key
  courseCount: number;
  courseIds: string[];    // ordered from easiest to hardest
  duration: string;       // e.g. "32h"
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  tags: string[];
  color: string;          // tailwind gradient classes for card accent
}
