import { Component, computed, effect, inject, input, model, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { ParcoursService } from '../../../../shared/services/parcours.service';

@Component({
  selector: 'app-parcours-filter',
  imports: [FormsModule, MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDividerModule],
  template: `
    <mat-form-field>
      <mat-label>Choisir une categorie ...</mat-label>
      <select matNativeControl [(ngModel)]="selectedparcours">
        <option [ngValue]='null'>Toutes les catégories</option>
        @for (parcours of parcoursFilter(); track parcours.id) {
          <option [ngValue]="parcours.id">{{ parcours.libelle}}</option>
        }
      </select>
    </mat-form-field>
    <mat-divider></mat-divider>
    
    
  
  `,
  styles: `
    :host {
      padding:20px;
    }

    .mat-divider {
      border-top-width:2px;
      border-color:var(--gray-700);
    }
  `,
})
export class ParcoursFilter {
  selectedparcours = model.required<string | null>()
  

  parcoursFilter = signal([
    {
      id:'experiences',
      libelle:'experiences'
    },
    {
      id:'formations',
      libelle:'formations'
    }

  ])


  //categorys = signal<CategoryInterface[]>(categoryData)
  //selectedCategory = computed(() => this.category() as string);
  

    

  

  
  
}
