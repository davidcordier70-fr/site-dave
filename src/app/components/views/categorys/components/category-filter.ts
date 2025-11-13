import { Component, computed, effect, inject, input, model, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-category-filter',
  imports: [FormsModule, MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDividerModule],
  template: `
    <mat-form-field>
      <mat-label>Choisir une categorie ...</mat-label>
      <select matNativeControl [(ngModel)]="selectedCategory">
        <option [ngValue]="undefined">Toutes les catégories</option>
        @for (category of categorysFilter(); track category._id) {
          <option [ngValue]="category.libelle_cat">{{ category.libelle }}</option>
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
export class CategoryFilter {
  selectedCategory = model.required<string | null>()
  categoryService=inject(CategoryService)
  categorysFilter = computed(() => this.categoryService.categoryResource.value()  ) 
  disableSelect = new FormControl(false);
  
  //categorys = signal<CategoryInterface[]>(categoryData)
  //selectedCategory = computed(() => this.category() as string);
  

  initCocktailFormEffect = effect(() => {
    console.log("selct : "+this.selectedCategory())
    //console.log(this.activatedRoute.params)
  })

  

  

  
  
}
