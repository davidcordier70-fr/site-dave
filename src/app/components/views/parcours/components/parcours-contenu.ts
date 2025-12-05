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
  <div class='d-flex gap-12 coordonnees mb-20'>
    <div class='d-flex flex-column card p-20 langue'>
      <div class='d-flex align-items-center titres mb-5'>
        <i class="fa-solid fa-address-book mr-10"></i>
        <h2>Mes coordonnées</h2>
      </div>
      <span class='border mb-15'></span>
      <div class='d-flex champcoor mb-10'>
        <span class='champcolor'>Nom et prénom :</span>
        <span>CORDIER David</span>
      </div>
      <div class='d-flex mb-10'>
        <span class='champcolor mr-5'>Tél :</span>
        <span>0699330291</span>
      </div>
      <div class='d-flex champcoor mb-20'>
        <span class='champcolor'>Email :</span> 
        <span>david.cordier70@gmail.com</span>
      </div>
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
        <div>
          <img src='./images/england_flag.png' class='imglangue pr-10'/>
          <span class='textlangue pr-20'>Anglais</span>
        </div>
        <div>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        
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
          <div class='d-flex contenuexp'>
            <div class='d-flex flex-column flex-fill'>
              <h3 class='mb-20'>{{ experience.titre }}</h3>
              <span>{{ experience.lieu }}</span>
              <span class='mb-20'>De {{ experience.montYearDeb |  slice: 0 : 2 }}/{{ experience.montYearDeb |  slice: 2 : 6 }} à {{ experience.montYearFin |  slice: 0 : 2 }}/{{ experience.montYearFin |  slice: 2 : 6 }}</span>
              <div class='imgxs'>
                <img class='mb-20 imgexp' [src]="experience.image" />
              </div>
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
              
              <h3 class='titres mb-5'>Postes occupés</h3>
              <span class='border2 mb-10'></span>
              
              @for(poste of experience.postes_occupes; track $index) {
                <span>{{ poste }}</span>
              }
              <div class='imglg'>
                <img class='mb-20 imgexp' [src]="experience.image" />
              </div>
              
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
          <div class='d-flex titleeco'>
            <h2 class='flex-fill titreform'>{{ formation.title }}</h2>
             @if (formation.ecole === '') {
                <h2 class='ecole'>{{ formation.plateforme }}</h2>
              } @else {
                <h2 class='ecole'>{{ formation.ecole }}</h2>
              }
          </div>
          <div class='d-flex'>
              <span class='border2 mb-10 flex-fill'></span>
          </div>
          <div class='d-flex'>
              <span>De {{ formation.montYearDeb |  slice: 0 : 2 }}/{{ formation.montYearDeb |  slice: 2 : 6 }} à {{ formation.montYearFin |  slice: 0 : 2 }}/{{ formation.montYearFin |  slice: 2 : 6 }}</span>
          </div>   
        </div> 
          
        
      
      
      }  
    
    </mat-tab>
  </mat-tab-group>`,
  styleUrl: 'parcours-contenu.scss',
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