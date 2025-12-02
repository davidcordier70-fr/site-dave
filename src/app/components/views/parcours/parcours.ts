import { Component, computed, inject, model, signal } from '@angular/core';
import { ParcoursContenu } from "./components/parcours-contenu";

import { ParcoursFilter } from "./components/parcours-filter";
import { ParcoursService } from '../../../shared/services/parcours.service';

@Component({
  selector: 'app-parcours',
  imports: [ParcoursContenu],
  template: `
    
    <app-contenu-parcours />
    
  `,
  styles: `
    :host {
      background:linear-gradient(90deg, white 0%, var(--gray-100) 100%);
      display:flex;
      flex-direction:column;
      padding:20px;
      flex:1;
      
      
    }
    
  `,
})
export class Parcours {

  
  parcoursService = inject(ParcoursService)
  experiencesList = computed(() => this.parcoursService.experienceResource.value())
  formationsList = computed(() => this.parcoursService.FormationResource.value())



}
