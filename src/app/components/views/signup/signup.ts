import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { UserService } from './../../../shared/services/user.service';
import { UserForm } from '../../../shared/interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <form [formGroup]="userForm" (submit)="submit()" class="card" autocomplete="off">
      <h2 class="mb-10">Bienvenue !</h2>
      <span class="d-flex flex-column mb-20">Créer votre compte</span>
      <div class="d-flex flex-column mb-20">
        <label for="email" class='mb-10'>Email</label>
        <div class="d-flex mb-10">
          <input formControlName="email" type="text" id="email" autocomplete="off" class='flex-fill'/>
        </div>
        <div class="d-flex flex-column">
            @if (emailControl.errors?.['required'] && (emailControl.touched || formSubmitted())) {
              <span class="error">Email obligatoire</span>
            } @else if (emailControl.errors?.['emailAlreadyUsed']) {
              <span class="error">Adresse email déjà utilisée</span>
            }
        </div>
      </div>
      
      <div class="d-flex flex-column">
        <div class="d-flex mb-20">
          <div class="d-flex flex-column">
            <label for="nom" class='mb-10'>Votre Nom</label>
            <input formControlName="nom" type="text" id="nom" autocomplete="off" class='mb-10'/>
              @if (nomControl.errors?.['required'] && (nomControl.touched || formSubmitted())) {
                <span class="error">Nom d'utilisateur obligatoire</span>
             } 
          </div>
          <div class="d-flex flex-column pl-20">
            <label for="prenom" class='mb-10'>Votre prénom</label>
            <input formControlName="prenom" type="text" id="prenom" autocomplete="off" class='mb-10'/>
            @if (prenomControl.errors?.['required'] && (prenomControl.touched || formSubmitted())) {
              <span class="error">Prénom d'utilisateur obligatoire</span>
            }
          </div>
        </div>
      </div>
      <div class="d-flex flex-column mb-20 ">
        <label for="password" class='mb-10'>Nom de l'entreprise</label>
        <div class="d-flex mb-10">
          <input formControlName="noment" type="text" id="noment" class='flex-fill' />
        </div>
        <div class="d-flex flex-column">
            @if (nomentControl.errors?.['required'] && (nomentControl.touched || formSubmitted())) {
              <span class="error">Nom d'entreprise obligatoire</span>
            } 
        </div>
      </div>
      <div class="d-flex flex-column mb-20 ">
        <label for="password" class='mb-10'>Mot de passe</label>
        <div class="d-flex mb-10">
          <input formControlName="password" type="password" id="password" class='flex-fill' />
        </div>
        <div class="d-flex flex-column">
            @if (passwordControl.errors?.['required'] && (passwordControl.touched || formSubmitted())) {
              <span class="error">Mot de passe obligatoire</span>
            } @else if (passwordControl.errors?.['minlength'] && (passwordControl.touched || formSubmitted())) {
              <span class="error">Mot de passe trop court</span>
            }
          
        </div>
      </div>
      <div class='d-flex align-items-center form-end'>
          <div class='flex-fill'>
            <button class="btn btn-primary d-flex">
              <span class='pr-10'>S'inscrire</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div class='btn-inscription'>
            <span class='pr-10'>Déjà inscrit ?</span>
            <button class='btn btn-primary' type='button' [routerLink]="'../signin'">Connecter vous à votre compte</button>
          </div>
      </div>
    </form>
  `,
  styles: `
    :host {
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
    }
    form h2 {
      align-items:left;
    }
    .input2 {
      width:100%;
    }
    .form-end button span {
      color:white;
      font-weight:500;
    }
    .btn-inscription {
      border-radius:10px;
      background:rgb(248, 250, 252);
      padding:10px;
      border:2px solid rgb(226, 232, 240);
    }
    .error {
      color: red;
      font-size: 0.875rem;
    }
  `,
})
export class Signup {
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    noment: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  formSubmitted = signal(false);
  readonly router = inject(Router);

  get emailControl() {
    return this.userForm.get('email') as FormControl;
  }

  get nomControl() {
    return this.userForm.get('nom') as FormControl;
  }

  get prenomControl() {
    return this.userForm.get('prenom') as FormControl;
  }

  get nomentControl() {
    return this.userForm.get('noment') as FormControl;
  }

  get passwordControl() {
    return this.userForm.get('password') as FormControl;
  }

  async submit() {
    console.log(this.userForm.get('username')?.errors);
    console.log(this.prenomControl.errors)
    this.formSubmitted.set(true);
    if (this.userForm.valid) {
      
      
      const userForm = this.userForm.getRawValue() as UserForm;
      try {
        const user = await this.userService.createUser(userForm);
        this.router.navigateByUrl('/signin');
      } catch (e: any) {
        console.log(e);
        if (e.message === 'adresse email déjà utilisée') {
          this.emailControl.setErrors({ emailAlreadyUsed: true });
        }
      }
    } 
  } 

}