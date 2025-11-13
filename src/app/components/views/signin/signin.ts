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

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <form [formGroup]="signinForm" (submit)="submit()" class="card" autocomplete="off">
      <h2 class="mb-10">Bon retour parmi nous !</h2>
      <span class="d-flex flex-column mb-20">Connectez vous à votre compte</span>
      <div class="d-flex flex-column mb-20">
        <label for="email" class='mb-10'>Email</label>
        <input formControlName="email" type="text" id="email" class='mb-10'/>
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
        <input formControlName="password" type="password" id="password" class='mb-10'/>
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
  `,
  styles: `:host {
      background:linear-gradient(90deg, white 0%, var(--gray-100) 100%);
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      flex:1;
      
      
    }
    .card {
  
      border-radius:10px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      background:white;
      padding:20px;
      


    }
    form label {
      color:var(--gray-700);
      font-weight:500;
    }
    form input {
      background:rgb(248, 250, 252);
      -moz-autofill-background:rgb(248, 250, 252);
      border:1px solid rgb(226, 232, 240);
      width:300px;
      height:40px;
      &:focus {
        background:rgb(248, 250, 252);
      }
    }

    
    form h2 {
      align-items:left;
    }
    .error {
      color: red;
      font-size: 0.875rem;
    }
    .btn-connexion {
      border-radius:10px;
      background:rgb(248, 250, 252);
      padding:10px;
      border:2px solid rgb(226, 232, 240);
    }
  `,
})
export class Signin {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
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
  
  async submit() {
    this.formSubmitted.set(true);
    if (this.signinForm.valid) {
      const signinForm = this.signinForm.getRawValue() as SigninForm;
      try {
        const user = await this.authService.signin(signinForm);
        this.router.navigateByUrl('/');
      } catch (e: any) {
        console.log(e);
        this.signinForm.setErrors({ general: true });
      }
    }
  }

}