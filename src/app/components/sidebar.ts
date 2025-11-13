import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Header } from "./header";
import { Home } from './views/Home/home';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}
@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, MatTreeModule, MatButtonModule, MatIconModule, RouterOutlet],
  template: `
    <mat-sidenav-container class="example-container">
    <mat-sidenav #sidenav mode="side" [(opened)]="opened" (opened)="events.push('open!')"
                (closed)="events.push('close!')" class='sidenav'>
      <div class='d-flex flex-row accueil'>
        <i class="fa-solid fa-house"></i>
        <span>Accueil</span>
      </div>
      <mat-tree #tree [dataSource]="dataSource" [childrenAccessor]="childrenAccessor">
  <!-- This is the tree node template for leaf nodes -->
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <!-- use a disabled button to provide padding for tree leaf -->
    <button matIconButton disabled></button>
    {{node.name}}
  </mat-tree-node>
  <!-- This is the tree node template for expandable nodes -->
  <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding matTreeNodeToggle
                 [cdkTreeNodeTypeaheadLabel]="node.name">
    <button matIconButton matTreeNodeToggle
            [attr.aria-label]="'Toggle ' + node.name">
      <mat-icon class="mat-icon-rtl-mirror">
        {{tree.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
      </mat-icon>
    </button>
    {{node.name}}
  </mat-tree-node>
</mat-tree>
    </mat-sidenav>

    <mat-sidenav-content class='mat-sidenav-content'>
      <div class='navbar'>
      <button matButton (click)="sidenav.toggle()"><i class="fa-solid fa-bars"></i></button>
      <div class='d-flex align-items-center mr-20 flex-fill'>
       <img src="./images/photo.jpg" alt="Photo d'identité">
      </div> 
      
      <ul class='d-flex flex-row '>
      <li   class='pr-10 mr-20'>
        <button class='btn btn-primary'>Admin</button>
        
        </li>
      <li   class='pr-10 mr-20'>
        
        <button class='btn btn-primary'>
          <i class="fa-regular fa-user"></i>
          Connexion
        </button></li>
      <li >
        <button class='btn btn-primary'>
          <i class="fa-solid fa-user-plus"></i>
          Inscription
      </button></li>
        
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
  padding-right:20px;

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
}
    
  `,
})
export class Sidebar {
  events: string[] = [];
  opened = signal(<boolean>(true));

  dataSource = EXAMPLE_DATA;

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

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
