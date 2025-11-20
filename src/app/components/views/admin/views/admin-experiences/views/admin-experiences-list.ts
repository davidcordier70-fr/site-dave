import { Component, computed, inject } from '@angular/core';

import { RouterLink } from "@angular/router";
import { ParcoursService } from '../../../../../../shared/services/parcours.service';

@Component({
  selector: 'app-admin-experiences-list',
  imports: [RouterLink],
  template: `
  <h4 class='mb-20'>Liste des experiences</h4>
  <ul>
  @for (experience of listExperiences(); track experience._id) {
    <li class='d-flex flex-row flex-fill mb-10 align-items-center justify-content-center mb-20'>
      <span class='flex-fill'>{{ experience.titre }}</span>
      <button class='btn btn-primary mr-20' [routerLink]="['..', experience._id, 'edit']">Editer</button>
      <button class='btn btn-danger' (click)="deleteExperience(experience._id)">Supprimer</button>
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
export class AdminExperiencesList {
  parcoursService = inject(ParcoursService)
  listExperiences=computed(()=> this.parcoursService.experienceResource.value() || undefined)

  deleteExperience(experienceId:string) {
    this.parcoursService.deleteExperience(experienceId)
  }


}
