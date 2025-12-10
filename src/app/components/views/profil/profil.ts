import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { UserService } from './../../../shared/services/user.service';
import { ProfilForm, User, UserForm } from '../../../shared/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { MatDialog } from '@angular/material/dialog';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profil',
  imports: [ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    @if (show()) {
        <div animate.enter="fade-in" animate.leave="fade-out" class="message-success">
          Les données ont bien été sauvegardées
        </div>
    } 
     @if (load()) {
    <mat-progress-spinner
        class="example-margin mb-20"
        [mode]="mode"
        >
    </mat-progress-spinner>
    <span>Sauvegarde des données en cours...</span>
     } @else {
    <form [formGroup]="profilForm" (submit)="submit()" class="card" autocomplete="off">
      
      <h2 class="mb-10">Votre profil</h2>
      
      <div class="d-flex flex-column mt-20">
        <div class="d-flex mb-20 flex-column">
          <div class="d-flex flex-column mb-20">
            <label for="nom" class='mb-10'>Votre Nom</label>
            <input formControlName="nom" type="text" id="nom" autocomplete="off" class='mb-10'/>
              @if (nomControl.errors?.['required'] && (nomControl.touched || formSubmitted())) {
                <span class="error">Nom d'utilisateur obligatoire</span>
             } 
          </div>
          <div class="d-flex flex-column">
            <label for="prenom" class='mb-10'>Votre prénom</label>
            <input formControlName="prenom" type="text" id="prenom" autocomplete="off" class='mb-10'/>
            @if (prenomControl.errors?.['required'] && (prenomControl.touched || formSubmitted())) {
              <span class="error">Prénom d'utilisateur obligatoire</span>
            }
          </div>
        </div>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="noment" class='mb-10'>Votre entreprise</label>
        <div class="d-flex mb-10">
          <input formControlName="noment" type="text" id="noment" autocomplete="off" class='flex-fill' />
        </div>
        <div class="d-flex flex-column">
            @if (nomentControl.errors?.['required'] && (nomentControl.touched || formSubmitted())) {
              <span class="error">Nom d'enreprise obligatoire</span>
            } 
        </div>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="noment" class='mb-10'>Votre email</label>
        <div class="d-flex mb-10">
          <input formControlName="email" type="text" id="email" autocomplete="off" class='flex-fill' />
        </div>
        <div class="d-flex flex-column">
            @if (emailControl.errors?.['required'] && (emailControl.touched || formSubmitted())) {
              <span class="error">Email obligatoire</span>
            } @else if (emailControl.errors?.['email'] && (emailControl.touched || formSubmitted())) {
              <span class="error">Le format de l'email est invalide</span>
            }
        </div>
      </div>
      <div>
        <button
          [disabled]="profilForm.invalid || formSubmitted()"
          class="btn btn-primary"
        >
          Sauvegarder
        </button>
      </div>
    </form>
    <form [formGroup]="secuForm" (submit)="submitSecu()" class="card pt-20" autocomplete="off">
      <h2 class="mb-10">Sécurité</h2>
           
      <div class="d-flex flex-column mt-20">
        <div class="d-flex mb-20 flex-column">
          <div class="d-flex flex-column mb-20">
            <label for="passwd" class='mb-10'>Nouveau mot de passe *</label>
            <div class="d-flex mb-10">
              <input formControlName="passwd" [type]="hide() ? 'password' : 'text'" id="passwd" autocomplete="off" class='flex-fill'/>
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
              @if (passwdControl.errors?.['required'] && (passwdControl.touched || formSecuSubmitted())) {
                <span class="error">Mot de passe obligatoire</span>
             } 
          </div>
          <div class="d-flex flex-column mb-20">
            <label for="confpasswd" class='mb-10'>Confirmation *</label>
            <div class="d-flex mb-10">
              <input formControlName="confpasswd" [type]="hide1() ? 'password' : 'text'" id="confpasswd" autocomplete="off" class=' flex-fill'/>
              <button type='button'
                  matIconButton
                  matSuffix
                  (click)="clickEvent1($event)"
                  [attr.aria-label]="'Hide password'"
                  [attr.aria-pressed]="hide1()"
              >
                <mat-icon>{{hide1() ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
          </div>
            @if (confpasswdControl.errors?.['required'] && (confpasswdControl.touched || formSecuSubmitted())) {
              <span class="error">Mot de passe obligatoire</span>
            } @else if (passwdControl.value != confpasswdControl.value) {
              <span class="error">Les deux mots de passe doivent être identiques</span>
            } 

            
          </div>
        </div>
        <div>
          <button
            [disabled]="secuForm.invalid"
            class="btn btn-primary"
          >
            Sauvegarder
          </button>
        </div>
      </div>
      </form>
          } 
      
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
    
    
  `,
  styleUrl:'profil.scss'

})
export class Profil {
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);
  readonly authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  profilId = toSignal(this.activatedRoute.params)()!['id'];
  show = signal(false);
  load = signal(false);
  mode: ProgressSpinnerMode = 'indeterminate';
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hide1 = signal(true);
  clickEvent1(event: MouseEvent) {
    this.hide1.set(!this.hide1());
    event.stopPropagation();
  }
  

  readonly dialog = inject(MatDialog);

  currentUser = this.authService.currentUserResource.value();

  profilForm = this.fb.group({
    noment: [{value:''}],
    nom: [{value:''}, [Validators.required, Validators.minLength(2)]],
    prenom: [{value:''}, [Validators.required, Validators.minLength(2)]],
    email: ['',  [Validators.required, Validators.email]]
  });

  secuForm = this.fb.group({
    passwd: ['', [Validators.required, Validators.minLength(6)]],
    confpasswd: ['', [Validators.required, Validators.minLength(6)]],
  });

  formSubmitted = signal(false);
  formSecuSubmitted = signal(false);
  readonly router = inject(Router);

  get emailControl() {
    return this.profilForm.get('email') as FormControl;
  }

  get nomControl() {
    return this.profilForm.get('nom') as FormControl;
  }

  get nomentControl() {
    return this.profilForm.get('noment') as FormControl;
  }

  get prenomControl() {
    return this.profilForm.get('prenom') as FormControl;
  }

  get passwdControl () {
    return this.secuForm.get('passwd') as FormControl;
  }
  
  get confpasswdControl () {
    return this.secuForm.get('confpasswd') as FormControl;
  }

  initCocktailFormEffect = effect(() => {
    if (this.profilId) {
      this.nomControl.setValue(this.currentUser.nom)
      this.prenomControl.setValue(this.currentUser.prenom)
      this.nomentControl.setValue(this.currentUser.noment)
      this.emailControl.setValue(this.currentUser.email)
    }
  })

  


   
  async submitSecu() {
      
      this.formSecuSubmitted.set(true);
      if (this.profilForm.valid) {
        const password = this.secuForm.getRawValue().passwd;
        const { _id, nom, prenom, noment, email} = this.currentUser;
        const newUSer = {
          _id:_id,
          nom : nom,
          prenom: prenom,
          noment: noment,
          email : email,
          password: password
        }
        
        try {

          
          const userPasswd = await this.userService.modifPassword(newUSer);
          
          
          
          this.authService.deconnexion.set(1)
          this.authService.logout()
                   
                   
          
        } catch (e: any) {
          console.log(e);
          
        }
      } 
      
       
    } 

    async submit() {
      this.formSubmitted.set(true);
      if (this.profilForm.valid) {
        const profilForm = this.profilForm.getRawValue() as ProfilForm;
        const { _id} = this.currentUser;
        const newUSer = {
          _id:_id,
          nom : profilForm.nom,
          prenom: profilForm.prenom,
          noment: profilForm.noment,
          email : profilForm.email
        }
        
        try {
          
          this.load.update((a) => !a)
          const userMod = await this.userService.modifUser(newUSer);
          await this.load.update((a) => !a)
          if (this.load() === false) {
            
            this.show.update((a) => !a)
            setTimeout(() => {
                this.show.update((a) => !a)
                this.formSubmitted.set(false);       
            }, 3000)
          }
          
          
        } catch (e: any) {
          console.log(e);
          
        }
      } 
    } 

}





