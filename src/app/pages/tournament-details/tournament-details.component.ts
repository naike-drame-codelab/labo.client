import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';
import { Status } from '../../models/status';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [CommonModule, ButtonModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  private _tournamentService = inject(TournamentService);
  tournament: Tournament | null = null;
  Status = Status;
  Category = Category;
  
  getCategoryNames(categories: number[] | undefined ): string | undefined {
    return categories?.map((c) => this.Category[c]).join(', ');
  }
  getStatusName(status: number| undefined ): string | undefined {
    return status !== undefined ? this.Status[status] : undefined;
  }

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._tournamentService.getById(id).subscribe((data: any) => {
      this.tournament = data;
    });
  }

  delete(route: ActivatedRoute){
    const id = Number(route.snapshot.paramMap.get('id'));
    this._tournamentService.delete(id).subscribe();
  }
}
