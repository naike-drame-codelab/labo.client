import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { FormErrorComponent } from "../../components/form-error/form-error.component";
import { FloatLabel } from 'primeng/floatlabel';
import { SessionService } from '../../services/session.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputText, FloatLabel, Button, Card, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  sessionService = inject(SessionService);
  httpClient = inject(HttpClient);
  router = inject(Router);
  messageService = inject(MessageService);

  loginForm = this.fb.group({
    usernameOrEmail: ['', [Validators.required]],
    password: [null, [Validators.required]],
  });

  login() {
    if(this.loginForm.invalid) {
      return;
    }
    this.httpClient.post<{token: string}>(environment.baseApiUrl + '/login', this.loginForm.value).subscribe({
      next: ({token}) => {
        // sauver le token qq part
        this.sessionService.startSession(token);
        // rediriger vers une autre page
        this.router.navigate(['/tournament']);
      },
      error: () => {
        // afficher un message d'erreur
        this.messageService.add({ severity: 'error', summary: 'Impossible de vous connecter' });
      }
    })
  }
}
