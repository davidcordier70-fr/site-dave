import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, resource, signal, viewChild } from '@angular/core';
import { Header } from './components/header';
import { Footer } from "./components/footer";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Home } from "./components/views/Home/home";
import { Sidebar } from './components/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './shared/services/auth.service';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, MatTreeModule, MatButtonModule, MatIconModule, RouterOutlet, RouterLink, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container class="example-container">
    <mat-sidenav #sidenav mode="side" [(opened)]="opened" (opened)="events.push('open!')"
                (closed)="events.push('close!')" class='sidenav'>
      <a class='d-flex flex-row menu' routerLink="">
        <i class="fa-solid fa-house"></i>
        <span>Accueil</span>
      </a>
      <a class='d-flex flex-row menu' routerLink="categorys">
        <i class="fa-solid fa-book-open"></i>
        <span>Mes compétences</span>
      </a>
      <a class='d-flex flex-row menu' routerLink="">
        <i class="fa-solid fa-person-running"></i>
        <span>Mon parcours professionnel</span>
      </a>
      <a class='d-flex flex-row menu' routerLink="">
        <i class="fa-solid fa-lightbulb"></i>
        <span>Mes réalisations</span>
      </a>
      @if (isLoggedin()) {
        <a class='d-flex flex-row menu' routerLink="contact">
          <i class="fa-solid fa-address-book"></i>
          <span>Me contacter</span>
        </a>
      }
      <a class='d-flex flex-row menu' routerLink="">
        <i class="fa-solid fa-pen-ruler"></i>
        <span>Conditions générales</span>
      </a>

      
    </mat-sidenav>

    <mat-sidenav-content class='mat-sidenav-content'>
      <div class='navbar'>
      <button matButton (click)="sidenav.toggle()"><i class="fa-solid fa-bars"></i></button>
      <div class='d-flex align-items-center mr-20 flex-fill'>
       <img src="./images/photo.jpg" alt="Photo d'identité">
      </div> 
      
      <ul class='d-flex flex-row '>
        @if (isLoggedin()) {
      
      

      <li   class='pr-10'>
        <button matButton [matMenuTriggerFor]="menu" #menuTrigger><i class="fa-solid fa-gear"></i></button>
        <mat-menu #menu="matMenu" class="customize">
          <div class='d-flex flex-column align-items-center p-20'>
            <span>{{ currentUser().prenom }} {{ currentUser().nom }}</span>
            <span>{{ currentUser().email }}</span>
        </div>
          <button mat-menu-item>
            <i class="fa-solid fa-user pr-10"></i>
            <span>Votre profil</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <i class="fa-solid fa-arrow-right-from-bracket pr-10"></i>
             <span >Deconnexion</span>
          </button>
        </mat-menu>
        
      } @else { 
      <li   class='pr-10 mr-20'>
        <button class='btn btn-primary' routerLink="admin">Admin</button>
        
        </li>
      <li   class='pr-10 mr-20'>
        
        <button class='btn btn-primary' routerLink="signin">
          <i class="fa-regular fa-user"></i>
          Connexion
        </button></li>
      
      <li >
        
        <button class='btn btn-primary' routerLink="signup">
          <i class="fa-solid fa-user-plus"></i>
          Inscription
      </button>
      </li>
      }
        
    </ul>
</div> 
    <router-outlet />
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: `
.example-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
}

.navbar {
  display:flex;
  align-items:center;
  height:80px;
  background:var(--mat-sys-tertiary);
  padding-right:10px;

}

.photo {
  margin:auto;
  width:100%;
}

.navbar .fa-bars {
  color:white;
}

.navbar span {
  color:white;
}

.navbar img {
  width:60px;
  border-radius:100px;
  
}

.mat-sidenav-content {
  display:flex;
  flex-direction:column;
  background:var(--gray-700);
  
}


.navbar a {
  text-align:left;
  color:white;
} 
.sidenav {
  background:var(--gray-700);
  padding:20px;
}

::ng-deep .customize {
  padding:15px 10px 10px 10px;
}

::ng-deep .customize button:hover {
  
  color:white;
  
}

.mat-mdc-menu-item:not([disabled]):hover {
  background-color:var(--gray-700);
}


   
  `
})
export class App {

  readonly authService = inject(AuthService);
  isLoggedin = this.authService.isLoggedin;
  currentUser=computed(() => this.authService.currentUserResource.value());

  public logout() {
    this.authService.logout();
  }

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  

  readonly dialog = inject(MatDialog);

  openDialog() {
    // #docregion focus-restoration
    const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false, 
      panelClass: 'my-custom-container'});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
    // #enddocregion focus-restoration
  }

  protected readonly title = signal('siteDave');
  events: string[] = [];
    opened = signal(<boolean>(true));
  
    dataSource = EXAMPLE_DATA;
  
    childrenAccessor = (node: FoodNode) => node.children ?? [];
  
    hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;


  

  constructor() {
    //seeddata()+
    //removedata()
    
  }

  

}

@Component({
  selector: 'dialog-from-menu-dialog',
  template: `<mat-dialog-content>
</mat-dialog-content>
<mat-dialog-actions>
  <button matButton mat-dialog-close>Okay</button>
</mat-dialog-actions>`,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFromMenuExampleDialog {}

const EXAMPLE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
