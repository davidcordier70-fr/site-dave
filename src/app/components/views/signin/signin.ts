import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { SigninForm } from '../../../shared/interfaces';
import { ProgressBarQueryExample } from "../../sidebar";
import {OnInit} from '@angular/core';
import {ProgressBarMode, MatProgressBarModule, MatProgressBar} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, ProgressBarQueryExample, MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressBarModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    @if (deconnexion()) {
     
      <section class="example-section">
      <h2>Mot de passe mise à jour avec succès. Vous allez être redirigé sur la page de connexion</h2>
      <mat-progress-bar
          class="example-margin"
          [mode]="modebar"
          [value]="value"
          [bufferValue]="bufferValue">
      </mat-progress-bar>
    </section>
    
    } @else {
      

    <div class='d-flex flex-fill flex-column'>
      <div>
        <progress-bar-query-example />
      </div>
      <div class='d-flex flex-column align-items-center flex-fill justify-content-center'>
      @if (loading()) {
      <mat-progress-spinner
              class="example-margin mb-20"
              [mode]="mode"
          >
      </mat-progress-spinner>
    } @else {
      <form [formGroup]="signinForm" (submit)="submit()"  class="card d-flex flex-column" autocomplete="off">
          
          <h2 class="mb-10">Bon retour parmi nous !</h2>
          <span class="d-flex flex-column mb-20">Connectez vous à votre compte</span>
          <div class="d-flex flex-column mb-20">
            <label for="email" class='mb-10'>Email</label>
            <input formControlName="email" type="text" id="email" class='mb-10 flex-fill'/>
            @if (emailControl.errors?.['required'] && (emailControl.touched ||
            formSubmitted())) {
            <span class="error">Email obligatoire</span>
            } @else if (emailControl.errors?.['email'] && (emailControl.touched ||
            formSubmitted())) {
            <span class="error">Email non valide</span>
            }
          </div>
          <div class="d-flex flex-column mb-20">
            <label for="password" class='mb-10'>Mot de passe</label>
            <div class="d-flex mb-10">
              <input formControlName="password" [type]="hide() ? 'password' : 'text'" id="password" class='flex-fill'/>
              <button type='button'
                matIconButton
                matSuffix
                (click)="clickEvent($event)"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide()"
              >
                <mat-icon>{{hide() ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </div>
            @if (passwordControl.errors?.['required'] && (passwordControl.touched ||
            formSubmitted() )) {
            <span class="error">Mot de passe obligatoire</span>
            } @else if (passwordControl.errors?.['minlength'] &&
            (passwordControl.touched || formSubmitted())) {
            <span class="error">Mot de passe trop court</span>
            }
          </div>
          <div class="mb-20">
            @if (signinForm.errors?.['general']) {
            <span class="error">Mot de passe ou email incorrect</span>
            }
          </div>

          <div>
            <button class="btn btn-primary d-flex mb-20">
                <span class='pr-10'>Se connecter</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <div class='btn-connexion'>
                <span class='pr-10'>Vous n'avez pas de compte ?</span>
                <button class='btn btn-primary' type='button' [routerLink]="'../signup'">Créer un compte</button>
            </div>
          </div>
        </form>
          }
        </div>
      </div>
          }
  
  `,
  styles: `
    :host {
      background:linear-gradient(90deg, white 0%, var(--gray-100) 100%);
      display:flex;
      flex-direction:column;
      flex:1;
      
      
    }
    

  `,
  styleUrl: 'signin.scss'
})
export class Signin implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  value = 50
  bufferValue = 75
  mode: ProgressSpinnerMode = 'indeterminate';
  
  deconnexion = this.authService.deconnexion
  modebar: ProgressBarMode = 'indeterminate';
  loading = signal(true)
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  readonly router = inject(Router);
  formSubmitted = signal(false);
  get emailControl() {
    return this.signinForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.signinForm.get('password') as FormControl;
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
ngOnInit(): void {
  this.loading.set(false)
}

  async submit() {
    this.formSubmitted.set(true);
    if (this.signinForm.valid) {
      const signinForm = this.signinForm.getRawValue() as SigninForm;
      try {
        const user = await this.authService.signin(signinForm);
        this.router.navigateByUrl('/');
      } catch (e: any) {
        this.signinForm.setErrors({ general: true });
      }
    }
  }

  constructor() {
    if (this.deconnexion()) {
      setTimeout(() => {
        this.deconnexion.set(0)
      },4000)
    } else {
      const currentUser = this.authService.currentUserResource.value();
      if (currentUser !== null) {
        this.router.navigateByUrl('/')
      }
    }

  }

}