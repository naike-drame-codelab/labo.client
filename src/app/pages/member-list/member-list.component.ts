import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';
import { Gender, toNames } from '../../models/gender';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  private _memberService = inject(MemberService);
  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);

  members: Member[] = [];
  Gender = Gender;
 
  getGenderName(gender: number| undefined ): string | undefined {
    return gender !== undefined ? this.Gender[gender] : undefined;
  }

  constructor() {
    this._memberService.getAll().subscribe((data: any) => {
      this.members = data;
    });
  }

  confirmDelete(memberId: number) {
    this._confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce membre ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.deleteMember(memberId);
        this._messageService.add({
          severity: 'success',
          summary: 'Le membre a été supprimé de la liste.',
        });
      },
      reject: () => {
        console.log("Suppression annulée !");
      }
    });
  }

  deleteMember(memberId: number) {
    this._memberService.delete(memberId).subscribe(() => {
      this.members = this.members.filter(t => t.id !== memberId);
    });
  }
}
