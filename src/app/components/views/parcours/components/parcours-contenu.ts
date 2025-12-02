import {ChangeDetectionStrategy, Component, computed, inject, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { ParcoursService } from '../../../../shared/services/parcours.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-contenu-parcours',
  template: `
  <div class='d-flex gap-12 mb-20'>
    <div class='d-flex flex-column card p-20 langue'>
      <div class='d-flex align-items-center titres mb-5'>
        <i class="fa-solid fa-address-book mr-10"></i>
        <h2>Mes coordonnées</h2>
      </div>
      <span class='border mb-15'></span>
      <div class='d-flex'>
        <span>Nom et prénom :</span>
        <span>CORDIER David</span>
      </div>
      <div class='d-flex'>
        <span>Tél :</span>
        <span>0699330291</span>
      </div>
      <span class='mb-20'>Email : david.cordier70@gmail.com</span>
      <div class='d-flex align-items-center titres mb-5'>
        <i class="fa-solid fa-location-dot mr-10"></i>
        <h2>Adresse </h2>
      </div>
      <span class='border mb-15'></span>
      <span>12 rue des Pommerey</span>
      <span>70200 Les Aynans</span>
      
      
    </div>
    <div class='d-flex flex-column card flex-fill p-20'>
      <div class='d-flex align-items-center mb-5 titres'>
        <i class="fa-solid fa-location-arrow mr-10"></i>
        <h2>Présentation et objectifs</h2>
      </div>
      <span class='border mb-15'></span>
      <span class='mb-20'>Doté d'une expérience de plus de 27 ans en développement informatique, je suis à la recherche d'un nouveau challenge en tant que développeur FULL STACK.</span>
      <span class='mb-20'>J'ai récemment acquis récemment des compétences sur les derniers frameworks tels que Symfony PHP et Angular ou encore dans le domaine du déploiement avec Docker.</span>
      <span>Rigoureux, dynamique et aimant travailler en équipe, je mettrai toute mon énergie au service de l'entreprise qui saura me faire confiance.</span>
    </div>
    <div class='d-flex flex-column card p-20 langue'>
      <div class='d-flex align-items-center titres mb-5'>
        
        <i class="fa-solid fa-language mr-10"></i>
        <h2>Langues</h2>
      </div>
      <span class='border mb-15'></span>
      <div class='d-flex align-items-center titres mb-5'>
        <img src='./images/england_flag.png' class='imglangue pr-10'/>
        <span class='textlangue pr-20'>Anglais</span>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        
      </div> 
      <div class='d-flex titres mb-15'>
        <span class='textlangueita'>Technique bon niveau</span>
        
      </div> 
      <div class='d-flex align-items-center titres mb-5'>
        <i class="fa-solid fa-link mr-10"></i>
        <h2>Liens utiles</h2>
      </div>
      <span class='border mb-15'></span>
      <a class='textlangueita' href="https://www.linkedin.com/in/david-cordier-3b2848207/">Mon profil Linkedin</a>
      
    </div> 
  </div>
  
  <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center">
    <mat-tab>
    <ng-template mat-tab-label>
      <h2>Expériences</h2>
    </ng-template>

      @for (experience of experiencesList(); track $index) {
        <div class='d-flex flex-column card mb-20 exp'>
          <div class='d-flex'>
            <div class='d-flex flex-column flex-fill'>
              <h3 class='mb-20'>{{ experience.titre }}</h3>
              <span>{{ experience.lieu }}</span>
              <span class='mb-20'>De {{ experience.montYearDeb |  slice: 0 : 2 }}/{{ experience.montYearDeb |  slice: 2 : 6 }} à {{ experience.montYearFin |  slice: 0 : 2 }}/{{ experience.montYearFin |  slice: 2 : 6 }}</span>
              <h3 class='titres mb-5'>Missions</h3>
              <span class='border2 mb-10'></span>
              @for(mission of experience.missions; track $index) {
                <div class='d-flex align-items-center mb-5'>
                  <i class="fa-solid fa-paper-plane pr-10"></i>
                  <span>{{ mission }}</span>
                </div>
              }
              <h3 class='titres mb-5 mt-20'>Technologies</h3>
              <span class='border2 mb-10'></span>
              @for(techno of experience.technologies; track $index) {
                <div class='d-flex align-items-center mb-5'>
                  <i class="fa-solid fa-paper-plane pr-10"></i>
                  <span>{{ techno }}</span>
                </div>
              }
            
            </div>
            <div class='d-flex flex-column postes'>
              <div>
              <img class='mb-20 imgexp' [src]="experience.image" />
            </div>
              <h3 class='titres mb-5'>Postes occupés</h3>
              <span class='border mb-10'></span>
              
              @for(poste of experience.postes_occupes; track $index) {
                <span>{{ poste }}</span>
              }
              
            </div>
          </div> 
          
        </div> 
      
      }  
    
    
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <h2>Formations</h2>
      </ng-template>
      @for (formation of formationsList(); track $index) {
        <div class='d-flex flex-column card mb-20 exp'>
          <div class='d-flex'>
            <div class='d-flex flex-column flex-fill'>
              <h2 class='mb-5'>{{ formation.title }}</h2>
              <span class='border2 mb-10'></span>
              <span>De {{ formation.montYearDeb |  slice: 0 : 2 }}/{{ formation.montYearDeb |  slice: 2 : 6 }} à {{ formation.montYearFin |  slice: 0 : 2 }}/{{ formation.montYearFin |  slice: 2 : 6 }}</span>
             
            </div> 
            <div class='d-flex flex-column'>
               @if (formation.ecole === '') {
                <h2 class='mb-20 ecole'>{{ formation.plateforme }}</h2>
              } @else {
                <h2 class='mb-20 ecole'>{{ formation.ecole }}</h2>
              }
            </div> 
            
            
            
          </div> 
          
        </div> 
      
      
      }  
    
    </mat-tab>
  </mat-tab-group>`,
  styles: `
  .example-action-buttons {
  padding-bottom: 20px;
}

.btn-accordeon {
  background-color:var(--mat-sys-tertiary);
  color:white;
  width:120px;
  font-size:12px;

}

.example-headers-align .mat-expansion-panel-header-description {
  justify-content: space-between;
  align-items: center;
  justify-content:end;
}

.mat-expansion-panel {
  //background:rgb(228, 225, 236);
  //background:var(--gray-100);
  
}

.mat-expansion-panel-header-title {
  font-weight:500;
}


.mat-expansion-indicator svg {
  fill:white;
}

.example-headers-align .mat-mdc-form-field + .mat-mdc-form-field {
  margin-left: 8px;
}

.card {
  background:white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius:10px;

}

.langue {
  width:450px;
}

.border {
  border:1px solid var(--mat-sys-tertiary);
  

}

.border2 {
  border:1px solid var(--mat-sys-tertiary);
  width:700px;
}

.titres {
  color:var(--mat-sys-tertiary);
}

.imglangue {
  width:40px;
}

.textlangue {
  color:black;
}

.textlangueita {
  font-style:italic;
}

.exp {
  padding:20px;
  margin:20px;
}

.postes {
  width:230px;
  
}

.mat-mdc-tab {
  font-size:20px;
}

.ecole {
  font-style:italic;
  font-size:20px;
  color:var(--mat-sys-tertiary);
}

a {
  text-align:left;
}


`,
  providers: [provideNativeDateAdapter(), { provide: LOCALE_ID, useValue: 'fr-FR'}],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    SlicePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcoursContenu {
  parcoursService = inject(ParcoursService)
  experiencesList = computed(() => this.parcoursService.experienceResource.value())
  formationsList = computed(() => this.parcoursService.FormationResource.value())
}