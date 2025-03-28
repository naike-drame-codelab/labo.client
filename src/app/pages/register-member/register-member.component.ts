import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Calendar } from 'primeng/calendar';
import { Card } from 'primeng/card';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../services/member.service';
import { catchError, finalize, map, of } from 'rxjs';
import { FormErrorComponent } from "../../components/form-error/form-error.component";

@Component({
  imports: [CommonModule, Button, InputText, FloatLabel, Calendar, Card, ReactiveFormsModule, Select, FormErrorComponent],
  templateUrl: './register-member.component.html',
  styleUrl: './register-member.component.scss'
})
export class RegisterMemberComponent {
  // créer le formulaire
  fb = inject(FormBuilder);
  // redirection
  router = inject(Router);
  // afficher toast
  messageService = inject(MessageService);
  // faire des requètes vers l'api
  memberService = inject(MemberService);

  isLoading = false;

  genders = [
    { label: 'Aucun', value: null },
    { label: 'Fille', value: 0 },
    { label: 'Garçon', value: 1 },
    { label: 'Autre', value: 2 },
  ]

  registerForm = this.fb.group({
    username: [null, [Validators.required, Validators.maxLength(100)]],
    email: [null, [Validators.required, Validators.maxLength(400), Validators.email], [
      (control: AbstractControl) => this.memberService.exists(control.value).pipe(
        map(() => ({ exist: true })),
        catchError(() => of(null))
      )
    ]],
    birthDate: [null, [Validators.required, /* Valider la date de naissance */]],
    elo: [null, [Validators.min(0), Validators.max(3000)]],
    gender: [null, [Validators.required]]
  });

  constructor() {
    const o$ = of(42).pipe(map(nb => nb > 18 ? 'majeur' : 'mineur'))
  }

  submit() {
    if(this.registerForm.invalid) {
      return;
    }
    // soumettre le formulaire à l'api
    this.isLoading = true;
    this.memberService.register(this.registerForm.value)
    //.pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'La sauvegarde a été effectuée avec succès' });
        this.router.navigate(['/member']);
        //this.isLoading = false;
      },
      error: (error) => {
        if(error.status === 500) {
          this.messageService.add({ severity: 'error', summary: error.statusText });

        }
        else if(error.status === 409) {
          this.messageService.add({ severity: 'error', summary: error.error });

        }
        
        //this.isLoading = false;
      }
    })
  }
}
