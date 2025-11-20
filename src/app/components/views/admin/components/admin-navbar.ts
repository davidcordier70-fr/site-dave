import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive }  from "@angular/router";

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a routerLink="categorys" routerLinkActive="active-link" class='mb-20'>Categories</a>
    <a routerLink="competences" routerLinkActive="active-link" class='mb-20'>Compétences</a>
    <a routerLink="experiences" routerLinkActive="active-link" class='mb-20'>Expériences</a>
    <a routerLink="formations" routerLinkActive="active-link" class='mb-20'>Formations</a>
    
  `,
  styles: `
  :host {
    display:flex;
    flex-direction:column;
    width:300px;
    padding:20px;
    margin:20px;
    border:1px solid var(--gray-100);
    border-radius:8px;
  }
  `
})
export class AdminNavbar {

}
