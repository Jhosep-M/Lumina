import { Routes } from '@angular/router';
export const LIVE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./live.component').then(m => m.LiveComponent) }
];