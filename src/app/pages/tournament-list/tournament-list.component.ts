import { Component, inject } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { Status } from '../../models/status';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SessionService } from '../../services/session.service';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.scss',
})
export class TournamentListComponent {
  private _tournamentService = inject(TournamentService);
  private _confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  sessionService = inject (SessionService);

  tournaments: Tournament[] = [];
  Status = Status;
  Category = Category;

  constructor() {
    if (this.sessionService.session().isAuthenticated) {
      this._tournamentService.getAll().subscribe((data: any) => {
        this.tournaments = data;
      });
    }
  }

  getCategoryNames(categories: number[]): string {
    return categories.map((c) => this.Category[c]).join(', ');
  }

  getStatusName(status: number | undefined): string | undefined {
    return status !== undefined ? this.Status[status] : undefined;
  }

  confirmDelete(tournamentId: number) {
    this._confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce tournoi ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.deleteTournament(tournamentId);
        this.messageService.add({
          severity: 'success',
          summary: 'Le tournoi a été supprimé de la liste.',
        });
      },
      reject: () => {
        console.log('Suppression annulée !');
      },
    });
  }

  deleteTournament(tournamentId: number) {
    this._tournamentService.delete(tournamentId).subscribe(() => {
      this.tournaments = this.tournaments.filter((t) => t.id !== tournamentId);
    });
  }
}
