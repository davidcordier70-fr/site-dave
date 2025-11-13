import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `
    <p>
      <span>Page introuvable</span>
    </p>
  `,
  styles: `
    :host {
      display:flex;
      flex:row;
      justify-content:center;
      align-items:center;
      flex:1;
      color:white;
      padding:20px;
    }

    p {
      color:black;
    }
  `
})
export class NotFound {



}
