// features/paths/routes.ts
import { Routes } from '@angular/router';
import { PathListComponent } from './path-list/path-list.component';
import { PathDetailComponent } from './path-detail/path-detail.component';

export const PATHS_ROUTES: Routes = [
  { path: '', component: PathListComponent },
  { path: ':id', component: PathDetailComponent },
];