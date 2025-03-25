import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    Button,
    InputText,
    FloatLabel,
    DatePickerModule,
    Card,
    MultiSelectModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss',
})
export class CreateTournamentComponent {
  fb = inject(FormBuilder);
  // redirection
  router = inject(Router);
  // afficher toast
  messageService = inject(MessageService);
  // faire des requètes vers l'api
  tournamentService = inject(TournamentService);

  categoriesList = [
    { label: 'Junior', value: 0 },
    { label: 'Senior', value: 1 },
    { label: 'Veteran', value: 2 },
  ]

  createForm = this.fb.group({
    name: [null, [Validators.required]],
    location: [null],
    minPlayers: [
      null, 
      [Validators.required, Validators.min(2), Validators.max(32)]
    ],
    maxPlayers: [
      null,
      [Validators.required, Validators.min(2), Validators.max(32)],
    ],
    minElo: [null, [Validators.min(0), Validators.max(3000)]],
    maxElo: [null, [Validators.min(0), Validators.max(3000)]],
    categories: [<number[]>[], [Validators.required]],
    endOfRegistrationDate: [
      null,
      [Validators.required, this.isEndOfRegistrationDateValid()]
    ],
    womenOnly: [false]
  });

  submit() {
    if (this.createForm.invalid) return;

    const formData = { 
      ...this.createForm.value, 
      categories: this.createForm.value.categories
    };

    this.tournamentService.create(formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Le tournoi a été créé avec succès !',
        });
        this.router.navigate(['/tournament/:id']);
      },
      error: (error) => {
        if (error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: error.statusText,
          });
        } else if (error.status === 409) {
          this.messageService.add({ severity: 'error', summary: error.error });
        }
      },
    });
  }

  // vérifie que (date de fin du tournoi + minPlayers) > today date
  isEndOfRegistrationDateValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const endOfRegistrationDate = control.value;
      const minPlayers = this.createForm?.get('minPlayers')?.value || 0;
  
      if (!endOfRegistrationDate || minPlayers < 2) return null;
  
      const requiredEndDate = new Date();
      requiredEndDate.setDate(new Date().getDate() + minPlayers);
  
      return new Date(endOfRegistrationDate) > requiredEndDate
        ? null
        : { isEndOfRegistrationDateValid: `Doit être après le ${requiredEndDate.toLocaleDateString()}` };
    };
  }
}
