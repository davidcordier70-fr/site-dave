import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CategoryFilter } from "./components/category-filter"
import { CategoryList } from "./components/category-list";
import { CompetenceService } from '../../../shared/services/competence.service';
import { ActivatedRoute, OnSameUrlNavigation } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { competencesData } from '../../../shared/data/competence.data';
import { CategoryInterface, CompetenceInterface, CompetenceInterfaceFDisplay } from '../../../shared/interfaces';
import { categoryData } from '../../../shared/data/category.data';
import { CategoryService } from '../../../shared/services/category.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-category',
  imports: [CategoryFilter, CategoryList],
  template: `
    <app-category-filter [selectedCategory]="selectedCategory()" (selectedCategoryChange)="selectedCategory.set($event)" />
    <app-category-list [competencesFilter]="competencesFilter()" [initialValueDisplays]="initialValueDisplays()"/>
  `,
  styles: `
    :host {
      background:white;
      //background:var(--mat-sys-tertiary);
      display:flex;
      flex:1;
      flex-direction:column;

    }
  `,
})
export class Category {

  donnees = competencesData;
  private location = inject(Location);
  private competenceService = inject(CompetenceService);
  private activatedRoute = inject(ActivatedRoute);
  category = toSignal(this.activatedRoute.params)()!['id']; 
  selectedCategory = signal<string | null>(null);
  competencesFilter = computed(() => this.selectedCategory() === '' || this.selectedCategory() == null ? this.competenceService.competenceResource.value()?.sort(compareCategorys) : this.competenceService.competenceResource.value()?.filter(({category_name}) =>category_name === this.selectedCategory()) ) 
  categoryService=inject(CategoryService)
  categorysFilter = computed(() => {
    console.log(this.selectedCategory())
    if (this.selectedCategory() === '' || this.selectedCategory() == null) { 
      console.log("all")
      return this.categoryService.categoryResource.value() 
     } else {
      return this.categoryService.categoryResource.value()?.filter(({libelle_cat}) =>libelle_cat === this.selectedCategory())
     } 
  })
  initialValue=signal(<CompetenceInterfaceFDisplay[]>([]))
  initialValueDisplays=computed(() => {
      console.log("recalcul")
      console.log(this.selectedCategory())
      if (this.selectedCategory() !== null) {
        console.log("coucou")
        this.location.go(`/categorys/${this.selectedCategory()}/`)
      } else {
        this.location.go(`/categorys/`)
      }
      let compet = <CompetenceInterface[]>([])
      let competenceDisplay = <CompetenceInterfaceFDisplay>({})
      const competenceDisplays = <CompetenceInterfaceFDisplay[]>([])
      let cat_preced=''
      this.categorysFilter()?.map((cat) => {
        console.log(cat.libelle)
        if (cat_preced === '') {
            compet = <CompetenceInterface[]>([])
            
        } else {
          if (cat_preced !== cat.libelle) {
            competenceDisplay.namecat = cat_preced
            competenceDisplay.competences = compet
            competenceDisplays.push(competenceDisplay) 
            competenceDisplay = <CompetenceInterfaceFDisplay>({})
            compet = <CompetenceInterface[]>([])
            
          }
        }
        const compFiltr = this.competencesFilter()?.filter((competence) => competence.category_name === cat.libelle_cat)
        compFiltr?.map((competence) => {
          compet.push(competence)
        })
        console.log(compet)
        cat_preced = cat.libelle


      })    
      if (cat_preced !== "") {
            competenceDisplay.namecat = cat_preced
            competenceDisplay.competences = compet
            competenceDisplays.push(competenceDisplay) 
            
            
      }
      console.log(competenceDisplays)
      return competenceDisplays 
    }) 

  initCocktailFormEffect = effect(() => {
    console.log("effect")
    
    if (this.category !== undefined) {
      console.log("coucou")
      this.selectedCategory.set(this.category())
      
    } 
    
    console.log(this.selectedCategory)
    //console.log(this.activatedRoute.params)
  })

  constructor() {
    console.log("constructor")
    if (this.category === undefined) {
      this.selectedCategory.set(null) 
      
    } else {
      this.selectedCategory.set(this.category)
      
    }
    console.log("2 "+this.selectedCategory())
  }

}


function compareCategorys(a:CompetenceInterface, b:CompetenceInterface): number {
  const nameA = a.category_name; // ignorer les majuscules/minuscules
  const nameB = b.category_name; // ignorer les majuscules/minuscules
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // les noms sont égaux
  return 0;
}

