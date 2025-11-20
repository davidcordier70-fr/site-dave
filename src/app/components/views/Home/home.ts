import { Component, computed, inject, resource, signal } from '@angular/core';
import { categoryData } from '../../../shared/data/category.data'
import { CategoryInterfaceGraph } from '../../../shared/interfaces';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';



@Component({
  selector: 'app-home',
  imports: [MatDividerModule, RouterLink],
  template: `
      
    <div class='d-flex flex-column pres'>
        <h1 class='mb-20'>Bienvenue</h1>
        <span class='mb-10'>David Cordier Développeur Full Stack</span>
        <span class='p1 mb-20'>Disposant d'une expérience de plus de 27 ans dans le développement informatique, je suis à l'écoute d'une nouvelle opportunité de carrière</span>
        <div class='d-flex'>
          <button class='btn btn-primary mb-20 mr-20' routerLink="parcours">Accéder à mon parcours professionnel</button>
          <button class='btn btn-primary mb-20' routerLink="realisations">Mes réalisations</button>
        </div>
        <mat-divider class='mb-20'></mat-divider>
        @if (isLoggedin()) {
          <div class='d-flex align-items-center mt-20'>
            <p class='mr-10'>Si vous souhaitez échanger sur mon parcours professionnel, vous pouvez me contacter via le lien suivant</p>
            <button class='btn btn-primary' routerLink="contact">Me Contacter</button>
          </div>
        } @else {
          <div class='d-flex align-items-center mt-20'>
            <p class='mr-10'>Si vous souhaitez échanger sur mon parcours professionnel, vous pouvez créer votre compte via le lien suivant</p>
            <button class='btn btn-primary' routerLink="signin">Créer un compte</button>
          </div>
        }
    </div>
               

    <div class='d-flex flex-column compet flex-fill'>
      <div class='d-flex align-items-center justify-content-center mb-20'>
        <h2 class='flex-fill '>Mes compétences</h2>
        <button class='btn btn-primary' [routerLink]="'categorys'">Toutes les compétences</button>
      </div>
      <div class='competences-container'>
        @for (category of categorysData(); track category.category_name) {
          <button [style.background]="category.background" class='outils' [routerLink]="['.', 'categorys',category.category_name]">
              <i [className]="category.codeClass"></i>
                <h2>{{ category.libelle}}</h2>
 
        </button>

        }
      </div>
    </div>
   
     
  `,
  styles: `
    :host {
      display:flex;
      flex:1;
      flex-direction:column;
      background:white;
      width:150vh;
      width:100%;

    }

    

    

  
  `,
  styleUrl: 'home.scss'
})
export class Home {
  categorysData = signal(<CategoryInterfaceGraph[]>(categoryData))
  readonly authService = inject(AuthService);
  isLoggedin = this.authService.isLoggedin;
  /*souscategorys = signal(<SousCategory[]>(sousCatagorysData))

  productService=inject(ProductService)

  tweetList=computed(() => this.productService.productResource.value() || [])*/
  constructor() {
    //seeddata()
    //removedata()
    console.log('coucou2');
  }

  
}
