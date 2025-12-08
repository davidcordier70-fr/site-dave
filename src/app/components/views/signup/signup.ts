import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { UserService } from './../../../shared/services/user.service';
import { UserForm } from '../../../shared/interfaces';
import { Router, RouterLink } from '@angular/router';
import { ProgressBarQueryExample } from "../../sidebar";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, ProgressBarQueryExample,MatProgressSpinnerModule],
  template: `

    
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
    <form [formGroup]="userForm" (submit)="submit()" class="card d-flex flex-column m-20" autocomplete="off">
      @if (load()) {
        <div class='d-flex flex-fill flex-column align-items-center'>
          <mat-progress-spinner
              class="example-margin mb-20"
              [mode]="mode"
          >
          </mat-progress-spinner>
          <span class='mb-20'>Création du compte en cours ...</span>
        </div>
      }
      <h2 class="mb-10">Bienvenue !</h2>
      <span class="d-flex flex-column mb-20">Créer votre compte</span>
      <div class="d-flex flex-column mb-10">
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
      <div class="d-flex civilnomprenom">
        <div class="d-flex flex-column mb-10 nom">
            <label for="nom" class='mb-10'>Votre Nom</label>
            <div class="d-flex">
              <input formControlName="nom" type="text" id="nom" autocomplete="off" class='mb-10 flex-fill'/>
            </div>
            <div class="d-flex flex-column">
                @if (nomControl.errors?.['required'] && (nomControl.touched || formSubmitted())) {
                  <span class="error">Nom d'utilisateur obligatoire</span>
              } 
            </div>
        </div> 
        <div class="d-flex flex-column mb-10 prenom">
            <label for="prenom" class='mb-10'>Votre prénom</label>
            <div class="d-flex">
              <input formControlName="prenom" type="text" id="prenom" autocomplete="off" class='mb-10 flex-fill'/>
            </div>
            <div class="d-flex flex-column"> 
              @if (prenomControl.errors?.['required'] && (prenomControl.touched || formSubmitted())) {
                <span class="error">Prénom d'utilisateur obligatoire</span>
              }
            </div>
        </div>
      </div>
      <div class="d-flex flex-column mb-10 ">
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
      <div class="d-flex flex-column mb-10 ">
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
      <div class='cardinscription'>
          <div class='inscription'>
            
            <button  [disabled]="userForm.invalid || formSubmitted()" class="btn btn-primary btn-inscription ">
             
              <span class='pr-10'>S'inscrire</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div class='btn-connexion '>
            <span class='pr-10'>Déjà inscrit ?</span>
            <button class='btn btn-primary' type='button' [routerLink]="'../signin'">Connecter vous à votre compte</button>
          </div>
      </div>
    </form>
          }
    </div>
    </div>
    
  `,
  styles: `
    :host {
      background:linear-gradient(90deg, white 0%, var(--gray-100) 100%);
      display:flex;
      flex-direction:column;
      flex:1;
      
      
    }
    
  `,
  styleUrl: 'signup.scss'
})
export class Signup implements OnInit{
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);
  load = signal(false)
  loading = signal(true)
  mode: ProgressSpinnerMode = 'indeterminate';

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

  ngOnInit(): void {
     this.loading.set(false)
  }
  async submit() {
    console.log(this.userForm.get('username')?.errors);
    console.log(this.prenomControl.errors)
    this.formSubmitted.set(true);
    if (this.userForm.valid) {
      
      
      const userForm = this.userForm.getRawValue() as UserForm;
      try {
        this.load.update((a) => !a)
        const user = await this.userService.createUser(userForm);
        this.load.update((a) => !a)
        
        this.router.navigateByUrl('/signin');
      } catch (e: any) {
        console.log(e);
        if (e.message === 'adresse email déjà utilisée') {
          this.formSubmitted.set(false)
          this.emailControl.setErrors({ emailAlreadyUsed: true });
          this.load.update((a) => !a)
        }
      }
    } 
  } 

}