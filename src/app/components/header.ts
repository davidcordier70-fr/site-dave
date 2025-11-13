import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router"
import { Sidebar } from './sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  imports: [MatSidenavModule],
  template: `
    
    <a  class='flex-fill'>Logo ManueCreat</a>
    <ul class='d-flex flex-row align-items-center'>
      <li   class='pr-10 mr-20'>
        
        Admin</li>
      <li   class='pr-10 mr-20'>
        
        <button class='btn btn-primary'>
          <i class="fa-solid fa-circle-user"></i>
          Connexion
        </button></li>
      <li >
        <button class='btn btn-primary'>
          <i class="fa-solid fa-user-plus"></i>
          Inscription
      </button></li>
        
    </ul>
  `,
  styles: `
    :host {
      display:flex;
      flex-direction:row;
      align-items:center;
      background-color:var(--primary);
      height:100px;
      color:white;
      
    }
    a {
      text-align:left;
      color:white;    
    }
    ul {
      padding:20px;
    }
  `
})
export class Header {

   opened = signal(<boolean>(false));
 


}
