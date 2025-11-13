import { Component, computed, inject } from '@angular/core';

import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CompetenceService } from '../../../../../../shared/services/competence.service';

@Component({
  selector: 'app-admin-competences-list',
  imports: [
    RouterLink
  ],
  template: `
  <h4 class='mb-20'>Liste des catégories</h4>
  <ul>
  @for (competence of listCompetences(); track competence._id) {
    <li class='d-flex flex-row flex-fill mb-10 align-items-center justify-content-center mb-20'>
      <span class='flex-fill'>{{ competence.name }}</span>
      <button class='btn btn-primary mr-20' [routerLink]="['..', competence._id, 'edit']">Editer</button>
      <button class='btn btn-danger' (click)="deleteCompetence(competence._id)">Supprimer</button>
    </li>
  }
  </ul> 
  `,
  styles: `

   ul li {
    border:1px solid var(--gray-100);
    border-radius:10px;
    padding:8px;
   }

   ul li span {
    font-weight:bold;
   }

   button {
      width:90px;
   }




  `
})
export class AdminCompetencesList {
  competenceService = inject(CompetenceService)
    listCompetences=computed(()=> this.competenceService.competenceResource.value() || undefined)
  
    deleteCompetence(competenceId:string) {
      this.competenceService.deleteCcompetence(competenceId)
    }
  


}
