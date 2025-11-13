import { Component, computed, inject, resource, signal } from '@angular/core';
import { categoryData } from '../../../shared/data/category.data'
import { CategoryInterfaceGraph } from '../../../shared/interfaces';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatDividerModule, RouterLink],
  template: `
      
      <div class='d-flex flex-row pres gap-24'>
          <div class='d-flex flex-column entete1'>
              <h1 class='mb-20'>Bienvenue</h1>
              <span class='mb-10'>David Cordier</span>
              <span class='mb-20'>Développeur Full Stack</span>
              <span class='p1 mb-20'>Disposant d'une expérience de plus de 27 ans dans le développement informatique, je suis à l'écoute d'une nouvelle opportunité de carrière</span>
              <button class='btn btn-primary'>Accéder à mon parcours professionnel</button>
            </div>
            <mat-divider [vertical]="true"></mat-divider>
            <div class='d-flex flex-column entete2'>
              <span class='mb-20'>Si vous souhaitez échanger sur mon parcours professionnel, vous pouvez créer votre compte et utiliser le formulaire de contact disponible sur le site </span>
              <button class='btn btn-primary' >Créer un compte</button>
            </div>
      </div>
               

    <div class='d-flex flex-column compet flex-fill'>
      <div class='d-flex align-items-center justify-content-center mb-20'>
        <h2 class='flex-fill '>Mes compétences</h2>
        <button class='btn btn-primary' [routerLink]="'categorys'">Toutes les compétences</button>
      </div>
      <div class='d-flex justify-content-center gap-12'>
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

    .pres {
      background: linear-gradient(45deg,rgba(2, 0, 36, 1) 0%, rgba(44, 58, 71, 1) 35%);
      width:600px;
      height:300px;
      width:100%;
      padding:40px;
    }

        
    .entete1 {
      color: white;
    }

    .entete2 {
      color: white;
    }

    .entete1 span {
      font-size:20px;
      font-weight:bold;
    }

    .entete1 span.p1{
      font-size:14px;
      font-weight:normal;
    }

    .entete1 button {
      width:300px;
    }

    .entete2 button {
      width:200px;
    }

  .compet {
    background:var(--gray-100);
    padding:20px;
  }

  .outils {
    
    height:200px;
    box-shadow: black 0px 4px 8px;
    display:flex;
    align-items:center;
    width:500px;
    justify-content:space-evenly;
    flex-direction:column;
    gap:12px;
    &:hover {
    transform: scale(1.1);
    transition: 1s transform;
    }
    cursor:pointer;
   
  }

  .outils h2 {
    color:white;
    text-align:center;
  }

  .outils i {
    color:white;
    font-size:50px;
    
  
  }

  
  `
})
export class Home {
  categorysData = signal(<CategoryInterfaceGraph[]>(categoryData))
  /*souscategorys = signal(<SousCategory[]>(sousCatagorysData))

  productService=inject(ProductService)

  tweetList=computed(() => this.productService.productResource.value() || [])*/
  constructor() {
    //seeddata()
    //removedata()
    console.log('coucou2');
  }

  
}
