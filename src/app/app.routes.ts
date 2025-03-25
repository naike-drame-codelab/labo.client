import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'member/register',
    loadComponent: () =>
      import('./pages/register-member/register-member.component').then(
        (c) => c.RegisterMemberComponent
      ),
  },
  {
    path: 'tournament/create',
    loadComponent: () =>
      import('./pages/create-tournament/create-tournament.component').then(
        (c) => c.CreateTournamentComponent
      ),
  },
  {
    path: 'tournament',
    loadComponent: () =>
      import('./pages/tournament-list/tournament-list.component').then(
        (c) => c.TournamentListComponent
      ),
  },
  {
    path: 'tournament/:id',
    loadComponent: () =>
      import('./pages/tournament-details/tournament-details.component').then(
        (c) => c.TournamentDetailsComponent
      ),
  },
];
