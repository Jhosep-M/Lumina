import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/role.guard';
import { LearnCourseComponent } from './learn-course/learn-course.component';

export const LEARNING_ROUTES: Routes = [
  {
    path: 'course/:id',
    component: LearnCourseComponent,
    canActivate: [authGuard],
  },
  {
    path: 'course/:id/quiz',
    component: LearnCourseComponent,
    canActivate: [authGuard],
  },
];