import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-admin-experiences',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class='d-flex flex-row align-items-center mb-20'>
    <a routerLink="listexp" routerLinkActive="active-link" class='mr-20'>Liste</a>
    <a routerLink="newexp" routerLinkActive="active-link">Nouveau</a>
  </div>
  <router-outlet />
  `,
  host: {
    class:'d-flex flex-column flex-fill'

  },

  styles: `



  :host {
    border:1px solid var(--gray-100);
    border-radius:8px;
    margin:20px;
    padding:20px;
  }








  `
})
export class AdminExperiences {

}
