import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <p>
      David Cordier 2025 © Tous droits réservés
    </p>
  `,
  styles: `
    :host {
        display:flex;
        flex:row;
        align-items:center;
        justify-content:center;
        background-color: var(--gray-700);
        color:white;
        height:100px;
    }

  `
})
export class Footer {

}
