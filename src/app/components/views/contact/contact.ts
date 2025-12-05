import { Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { UserService } from './../../../shared/services/user.service';
import { ContactInterfaceForm, UserForm } from '../../../shared/interfaces';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../shared/services/contact.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="contactForm" (submit)="submit()" class="card" autocomplete="off">
      <h2 class="mb-10">Bienvenue !</h2>
      <span class="d-flex flex-column mb-20">Vous pouvez me contacter en cas d'opportunité de carrière ou tout simplement si vous souhaitez échanger sur mon parcours professionnel</span>
      
      
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex flex-column flex-fill mb-10">
            <label for="nom" class='mb-10'>Votre Nom</label>
            <input formControlName="nom" type="text" id="nom" autocomplete="off" class='mb-10'/>
              @if (nomControl.errors?.['required'] && (nomControl.touched || formSubmitted())) {
                <span class="error">Nom d'utilisateur obligatoire</span>
             } 
          </div>
          <div class="d-flex flex-column flex-fill mb-10">
            <label for="prenom" class='mb-10'>Votre prénom</label>
            <input formControlName="prenom" type="text" id="prenom" autocomplete="off" class='mb-10'/>
            @if (prenomControl.errors?.['required'] && (prenomControl.touched || formSubmitted())) {
              <span class="error">Prénom d'utilisateur obligatoire</span>
            }
          </div>
        </div>
      </div>
      <div class="d-flex flex-column mb-10">
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
      <div class="d-flex flex-column mb-10 ">
        <label for="titre" class='mb-10'>Titre du message</label>
        <div class="d-flex mb-10">
          <input formControlName="titre" type="text" id="titre" class='flex-fill' />
        </div>
        <div class="d-flex flex-column">
            @if (titreControl.errors?.['required'] && (titreControl.touched || formSubmitted())) {
              <span class="error">Titre obligatoire</span>
            } @else if (titreControl.errors?.['minlength'] && (titreControl.touched || formSubmitted())) {
              <span class="error">Le titre doit être de 2 caractères minimum</span>
            }
        </div>
      </div>
      <div class="d-flex flex-column mb-10 ">
        <label for="password" class='mb-10'>Message</label>
        <div class="d-flex mb-10">
          <textarea
          formControlName="message"
          id="message"
          rows="5"
          class='flex-fill'
          ></textarea>
        </div>
        <div class="d-flex flex-column">
            @if (messageControl.errors?.['required'] && (messageControl.touched || formSubmitted())) {
              <span class="error">Message obligatoire</span>
            } @else if (messageControl.errors?.['minlength'] && (messageControl.touched || formSubmitted())) {
              <span class="error">Le titre doit être de 30 caractères minimum</span>
            }
          
        </div>
      </div>
      <div>
        <button
          [disabled]="contactForm.invalid"
          class="btn btn-primary"
        >
          Envoyer
        </button>
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
    
  `,
   styleUrl:'contact.scss'
})
export class Contact {
  readonly fb = inject(FormBuilder);
  readonly contactService = inject(MessageService);
  readonly authService = inject(AuthService);
  isLoggedin = this.authService.isLoggedin;
  currentUser=computed(() => this.authService.currentUserResource.value());

  contactForm = this.fb.group({
    noment: [{value:'',disabled:true}],
    nom: [{value:'',disabled:true}, [Validators.required, Validators.minLength(2)]],
    prenom: [{value:'',disabled:true}, [Validators.required, Validators.minLength(2)]],
    titre: ['',  [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(30)]],
    email: [{value:'',disabled:true}],
  });

  formSubmitted = signal(false);
  readonly router = inject(Router);

  get titreControl() {
    return this.contactForm.get('titre') as FormControl;
  }

  get messageControl() {
    return this.contactForm.get('message') as FormControl;
  }

  get nomControl() {
    return this.contactForm.get('nom') as FormControl;
  }

  get nomentControl() {
    return this.contactForm.get('noment') as FormControl;
  }

  get prenomControl() {
    return this.contactForm.get('prenom') as FormControl;
  }

  get mailControl() {
    return this.contactForm.get('email') as FormControl;
  }

  
  initCocktailFormEffect = effect(() => {
    if (this.isLoggedin()) {
      this.nomControl.setValue(this.currentUser().nom)
      this.prenomControl.setValue(this.currentUser().prenom)
      this.mailControl.setValue(this.currentUser().email)
    }
  })
  

  async submit() {
    console.log(this.contactForm.get('username')?.errors);
    console.log(this.prenomControl.errors)
    this.formSubmitted.set(true);
    if (this.contactForm.valid) {
      
      
      const contactForm = this.contactForm.getRawValue() as ContactInterfaceForm;
      try {
        const contact = await this.contactService.createMessage(contactForm);
        this.router.navigateByUrl('/signin');
      } catch (e: any) {
        console.log(e);
        
      }
    } 
  } 

}