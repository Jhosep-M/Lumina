import { Routes } from '@angular/router';
// TODO: crear componente PathListComponent en features/paths/path-list/
// import { PathListComponent } from './path-list/path-list.component';

export const PATHS_ROUTES: Routes = [
  // { path: '', component: PathListComponent }
  { path: '', redirectTo: '/courses', pathMatch: 'full' } // temporal
];