import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-admin-formations',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class='d-flex flex-row align-items-center mb-20'>
    <a routerLink="listfor" routerLinkActive="active-link" class='mr-20'>Liste</a>
    <a routerLink="newfor" routerLinkActive="active-link">Nouveau</a>
  </div>
  <router-outlet />
  `,
  host: {
    class:'d-flex flex-column flex-fill'

  },

  styles: `



  :host {
    border:1px solid var(--gray-700);
    border-radius:8px;
    margin:20px;
    padding:20px;
    
  }








  `
})
export class AdminFormations {

}
