import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'member',
        loadComponent: () =>
          import('./pages/member-list/member-list.component').then(
            (c) => c.MemberListComponent
          ),
          canActivate: [authenticatedGuard],

      },
      {
        path: 'member/register',
        loadComponent: () =>
          import('./pages/register-member/register-member.component').then(
            (c) => c.RegisterMemberComponent
          ),
          canActivate: [authenticatedGuard],
      },
      {
        path: 'tournament/create',
        loadComponent: () =>
          import('./pages/create-tournament/create-tournament.component').then(
            (c) => c.CreateTournamentComponent
          ),
          canActivate: [authenticatedGuard],

      },
      {
        path: 'tournament',
        loadComponent: () =>
          import('./pages/tournament-list/tournament-list.component').then(
            (c) => c.TournamentListComponent
          ),
          canActivate: [authenticatedGuard],
      },
      {
        path: 'tournament/:id',
        loadComponent: () =>
          import(
            './pages/tournament-details/tournament-details.component'
          ).then((c) => c.TournamentDetailsComponent),
          canActivate: [authenticatedGuard],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
    ],
  },
];
