import { Component, model } from '@angular/core';
import { ParcoursContenu } from "./components/parcours-contenu";

import { ParcoursFilter } from "./components/parcours-filter";

@Component({
  selector: 'app-parcours',
  imports: [ParcoursContenu, ParcoursFilter],
  template: `
    filter
    <app-contenu-parcours>
    <app-parcours-filter [selectedparcours]="selectedparcours()">
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

  selectedparcours = model.required<string | null>()

}
