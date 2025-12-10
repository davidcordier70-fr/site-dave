import { Component, computed, inject } from '@angular/core';

import { RouterLink } from "@angular/router";
import { CategoryService } from '../../../../../../shared/services/category.service';

@Component({
  selector: 'app-admin-categorys-list',
  imports: [RouterLink],
  template: `
  <h4 class='mb-20'>Liste des catégories</h4>
  <ul>
  @for (category of listCategorys(); track category._id) {
    <li class='d-flex flex-row flex-fill mb-10 align-items-center justify-content-center mb-20'>
      <span class='flex-fill'>{{ category.libelle }}</span>
      <button class='btn btn-primary mr-20' [routerLink]="['..', category._id, 'edit']">Editer</button>
      <button class='btn btn-danger' (click)="deleteCategory(category._id)">Supprimer</button>
    </li>
  }
  </ul> 
  `,
  styles: `

   ul li {
    border:1px solid var(--gray-100);
    border-radius:10px;
    padding:8px;
   }

   ul li span {
    font-weight:bold;
   }

   button {
      width:90px;
   }




  `
})
export class AdminCategorysList {
  categoryService = inject(CategoryService)
  listCategorys=computed(()=> this.categoryService.categoryResource.value() || undefined)

  deleteCategory(categoryId:string) {
    this.categoryService.deleteCategory(categoryId)
  }


}
