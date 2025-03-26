import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { FormErrorComponent } from "../../components/form-error/form-error.component";
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputText, FloatLabel, Button, Card, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.loginForm.valid) {
      console.log('Connexion avec :', this.loginForm.value);
      // Ici, ajoute l'appel API pour l'authentification
      this.router.navigate(['/']); // Redirection après connexion
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
