import { Component, inject } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { Status } from '../../models/status';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.scss'
})
export class TournamentListComponent {
  private _tournamentService = inject(TournamentService);
  tournaments: Tournament[] = [];
  Status = Status;
  Category = Category;
  getCategoryNames(categories: number[]): string {
    return categories.map(c => this.Category[c]).join(", ");
  }
  getStatusName(status: number| undefined ): string | undefined {
    return status !== undefined ? this.Status[status] : undefined;
  }

  constructor(){
    this._tournamentService.getAll().subscribe((data: any) => {
      this.tournaments = data;
    });;
  }
}
