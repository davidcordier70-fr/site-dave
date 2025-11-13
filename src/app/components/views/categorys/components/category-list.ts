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
     
             
             @for (competence of initial.competences; track $index) {
                 <div class='comp d-flex'>
                
                <img [src]="competence.image" class='imgcomp mr-20'>
                <div class='d-flex flex-column justify-content-center'>
                  <span>{{competence.name}}</span>
                </div>
                <div class='d-flex flex-column justify-content-center'>
                  <mat-divider [vertical]="true" ></mat-divider>
                </div>
                <div class='d-flex flex-column'>
                    <h2>Compétences clés</h2>
                    <mat-divider></mat-divider>
                    <div class='mt-10'>
                      @for (comp of competence.competences; track $index) {
                        @if ($index === 0) {{{comp}}} @else {, {{ comp}}}
                      
                      }
                    </div>
                  </div>  
                  </div>
                
              
                  
              }
            
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
    .imgcomp {
      width:100px;
      background-size:cover;
      background:var(--gray-100);
      padding:20px;
      border-radius:20px;
    }

    .imgcomp1 {
      width:200px;
    }

    .comp {
      margin-bottom:20px;
      background:var(--gray-700);
      box-shadow: black 0px 2px 2px;
      padding:20px;
      border-radius:10px;
      color:white;
    }

    .comp span {
      color:white;
    }

    .comp h2 {
      color:white;
      font-size:14px;
      border:none;
    }

    .mat-divider.mat-divider-vertical {
      height:80px;
      margin-left:20px;
      margin-right:20px;
      border-right-width:3px;
      
    }

    .mat-divider {
      border-top-width:2px;
    }

    .listcomp span {
      color:white;
      font-weight:normal;
    }
  `,
})
export class CategoryList {

  competencesFilter=input<CompetenceInterface[]>();
  categorysFilter = input<CategoryInterface[]>();
  initialValueDisplays = input<CompetenceInterfaceFDisplay[]>();
  nbCat=signal<number>(0);
  
  incrementCat() {
    computed(() => this.nbCat.set(1))
  }

  constructor() {
    console.log(this.competencesFilter)
  }

  initCocktailFormEffect = effect(() => {
    
    console.log('catparent : '+this.initialValueDisplays())
    //console.log(this.activatedRoute.params)
  })

}


