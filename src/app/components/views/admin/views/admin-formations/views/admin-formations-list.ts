import { Component, computed, inject } from '@angular/core';

import { RouterLink } from "@angular/router";
import { ParcoursService } from '../../../../../../shared/services/parcours.service';

@Component({
  selector: 'app-admin-formations-list',
  imports: [RouterLink],
  template: `
  <h4 class='mb-20'>Liste des formations</h4>
  <ul>
  @for (formation of listFormations(); track formation._id) {
    <li class='d-flex flex-row flex-fill mb-10 align-items-center justify-content-center mb-20'>
      <span class='flex-fill'>{{ formation.title }}</span>
      <button class='btn btn-primary mr-20' [routerLink]="['..', formation._id, 'edit']">Editer</button>
      <button class='btn btn-danger' (click)="deleteFormation(formation._id)">Supprimer</button>
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
export class AdminFormationsList {
  parcoursService = inject(ParcoursService)
  listFormations=computed(()=> this.parcoursService.FormationResource.value() || undefined)

  deleteFormation(formationId:string) {
    this.parcoursService.deleteFormation(formationId)
  }


}
