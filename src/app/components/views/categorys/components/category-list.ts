import { Component, computed, effect, input, signal } from '@angular/core';
import { CompetenceInterface, CategoryInterface,  CompetenceInterfaceFDisplay } from '../../../../shared/interfaces';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-category-list',
  imports: [MatDividerModule],
  template: `
    
    @for (initial of initialValueDisplays(); track initial.namecat) {
      <h2>{{initial.namecat}}</h2>
      <mat-divider></mat-divider>
      <div class='d-flex flex-column mt-20'>
     
             <div class='mt-20 competences-container'>
              @for (competence of initial.competences.sort(compareCompetences); track $index) {
                 <div class='comp d-flex flex-column'>
                    <div class='background-comp' [style.background]="competence.gradient">
                    </div>
                    <div class='d-flex infosent' [style.padding]="competence.padding_image" >
                      <span class='flex-fill'>{{competence.name}}</span>
                      <div class='divimg'>
                        <img [src]="competence.image"  class='imgcomp' >
                       </div>
                    </div>
                    <div class='d-flex flex-column infoscomp'>
                        <div class='mt-10'>
                           @for (comp of competence.competences; track $index) {
                             @if ($index === 0) {{{comp}}} @else {, {{ comp}}}
                      
                           }
                        </div>
                    </div>  
                  </div>
              }
            </div>
            
      </div>
     
          
      
      
      
      
      }
    
    
    


   
    
  `,
  styles: `
    :host {
      display:flex;
      flex-direction:column;
      padding-left:20px;
      padding-right:20px;
      
      
      
    }
    

    
  `,
   styleUrl:'./../category.scss'
})
export class CategoryList {

  competencesFilter=input<CompetenceInterface[]>();
  categorysFilter = input<CategoryInterface[]>();
  initialValueDisplays = input<CompetenceInterfaceFDisplay[]>();
  nbCat=signal<number>(0);
  
  incrementCat() {
    computed(() => this.nbCat.set(1))
  }

  compareCompetences(a:CompetenceInterface, b:CompetenceInterface): number {
    const nameA = a.name; // ignorer les majuscules/minuscules
    const nameB = b.name; // ignorer les majuscules/minuscules
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // les noms sont égaux
    return 0;
  }

}




