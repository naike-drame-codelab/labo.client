import { Component, inject, signal } from '@angular/core';
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

  tournaments = signal<Tournament[]>([]);
  Status = Status;
  Category = Category;

  isRegistered: boolean = false;

  constructor() {
    if (this.sessionService.session().isAuthenticated) {
      this._tournamentService.getAll().subscribe((data: any) => {
        this.tournaments.set(data);
      });
    }
  }

  getCategoryNames(categories: number[]): string {
    return categories.map((c) => this.Category[c]).join(', ');
  }

  getStatusName(status: number | undefined): string | undefined {
    return status !== undefined ? this.Status[status] : undefined;
  }

  confirmRegistration(tournamentId: number) {
    this._confirmationService.confirm({
      message: 'Voulez-vous vous inscrire à ce tournoi ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
       //  this.registerToTournament(tournamentId);
       console.log(tournamentId);
       this.registerToTournament(tournamentId);
       
        this.messageService.add({
          severity: 'success',
          summary: 'Vous êtes inscrit au tournoi.',
        });
      },
      reject: () => {
        console.log('Suppression annulée !');
      },
    });
  }

  confirmUnRegistration(tournamentId: number) {
    this._confirmationService.confirm({
      message: 'Voulez-vous vous désinscrire ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
       //  this.registerToTournament(tournamentId);
       console.log(tournamentId);
       this.unregisterToTournament(tournamentId);
       
        this.messageService.add({
          severity: 'success',
          summary: 'Vous êtes désinscrit de ce tournoi.',
        });
      },
      reject: () => {
        console.log('Suppression annulée !');
      },
    });
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

  registerToTournament(tournamentId : number){
    // return this.isRegistered = true;
    this._tournamentService.register(tournamentId).subscribe();
  }

  unregisterToTournament(tournamentId : number){
    return this.isRegistered = false;
    // this._tournamentService.join(tournamentId).subscribe();
  }

  checkRegistration(tournamentId : number, memberId: number) : boolean {
    return tournamentId > 0 && memberId > 0;;
  }

  deleteTournament(tournamentId: number) {
    this._tournamentService.delete(tournamentId).subscribe(() => {
      const updatedTournaments = this.tournaments().filter(
        (t) => t.id !== tournamentId
      );
      this.tournaments.set(updatedTournaments);
    });
  }
}
