// src/app/features/user-profile/routes.ts
import { Routes } from '@angular/router';
// TODO: crear ProfileComponent en features/user-profile/profile/
// import { ProfileComponent } from './profile/profile.component';

export const PROFILE_ROUTES: Routes = [
  // { path: '', component: ProfileComponent }
  { path: '', redirectTo: '/courses', pathMatch: 'full' } // temporal
];