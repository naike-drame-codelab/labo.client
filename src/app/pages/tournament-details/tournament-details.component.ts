import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';
import { Status } from '../../models/status';
import { Category, toNames } from '../../models/category';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {Tag } from "primeng/tag";
import { MessageService } from 'primeng/api';

@Component({
  imports: [CommonModule, ButtonModule, RouterModule, CardModule, Tag],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  private _tournamentService = inject(TournamentService);
  private _messageService = inject(MessageService);
  tournament: Tournament | null = null;
  Status = Status;
  Category = Category;
  
  getCategoryNames(categories: number[] | undefined): string[] {
    return toNames(categories ?? []);
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
    this._tournamentService.delete(id).subscribe({
      next: (data: any) => {
        this.tournament = data;
      },
      error: (err) => {
        this._messageService.add({severity: 'error', summary: 'Error', detail: 'Tournament not found.'});
      }
    });
  }
}
