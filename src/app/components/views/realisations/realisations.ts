import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { RealService } from '../../../shared/services/real.service';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-realisations',
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    MatProgressSpinnerModule],
  template: `
    @if (loading()) {
      <div class='d-flex flex-fill justify-content-center align-items-center'>
        <mat-progress-spinner
                
                [mode]="mode"
            >
        </mat-progress-spinner>
      </div>
    } @else {
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center">
    <mat-tab>
    <ng-template mat-tab-label>
      <h2>Projets professionnels</h2>
    </ng-template>

      @for (realpro of realPro(); track $index) {
        <div class='d-flex flex-column card mb-20 exp'>
          <div class='d-flex contenuexp'>
            <div class='d-flex flex-column flex-fill'>
              <h3 class='mb-20'>{{ realpro.libelle }}</h3>
              
              <div class='d-flex infodescr'>
                <div class='d-flex flex-column'>
                  <h3 class='titres mb-5'>Description</h3>
                  <span class='border mb-10'></span>
                  <p>{{ realpro.description }}</p>
                  
                </div>
                
                  @if (realpro.image != '') {
                    <div class='d-flex flex-column infoimg'>
                      <div>
                        <img [src]="realpro.image">
                      </div>
                    </div>
                  }
                
              </div>
              <div class='d-flex infosreal'>
                <div class='d-flex flex-column infotech'>
                  <h3 class='titres mb-5 flex-fill'>Technologies</h3>
                  <span class='border2 mb-10'></span>
                  @if (realpro.technologie_back != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech'>Back </span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realpro.technologie_back}}</span>
                      </div>
                  }
                  @if (realpro.technologie_front != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech '>Front</span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realpro.technologie_front}}</span>
                      </div>
                  }
                  @if (realpro.gestion_contenu != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech1'>Gestion de contenu</span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realpro.gestion_contenu}}</span>
                      </div>
                  }
                </div>
                <div class='d-flex flex-column flex-fill infobdd'>
                  <h3 class='titres mb-5'>Base de données</h3>
                  <span class='border2 mb-10'></span>
                  <div class='d-flex flex-column '>
                    {{ realpro.base_de_donnees}}
                  </div>
                </div>
                
              </div>
              
            
            </div>
            
            
          </div> 
          @if (realpro.url_site != '') {
             <div class='d-flex infourl'>
                <h3>Lien vers le site : <a [href]="realpro.url_site" target='_blank' [style.color]="'rgb(0, 92, 187)'"> {{ realpro.url_site }}</a></h3>
             </div>
          }
           @if (realpro.github != '') {
              <div class='d-flex infourl'>
                  <h3>Lien vers github : <a [href]="realpro.github" target='_blank' [style.color]="'rgb(0, 92, 187)'"> {{ realpro.github }}</a></h3>
              </div>
           }
                
          
        </div>  
                }  
    
    
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <h2>Projets personnels</h2>
      </ng-template>
      @for (realperso of realPerso(); track $index) {
        <div class='d-flex flex-column card mb-20 exp'>
          <div class='d-flex contenuexp'>
            <div class='d-flex flex-column flex-fill'>
              <h3 class='mb-20'>{{ realperso.libelle }}</h3>
              
              <div class='d-flex infodescr'>
                <div class='d-flex flex-column'>
                  <h3 class='titres mb-5'>Description</h3>
                  <span class='border mb-10'></span>
                  <p>{{ realperso.description }}</p>
                  
                </div>
                
                  @if (realperso.image != '') {
                    <div class='d-flex flex-column'>
                      <div class='infoimg'>
                        <img [src]="realperso.image">
                      </div>
                    </div>
                  }
                
              </div>
              
              <div class='d-flex infosreal '>
                <div class='d-flex flex-column infotech'>
                  <h3 class='titres mb-5 flex-fill'>Technologies</h3>
                  <span class='border2 mb-10'></span>
                  @if (realperso.technologie_back != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech'>Back </span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realperso.technologie_back}}</span>
                      </div>
                  }
                  @if (realperso.technologie_front != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech '>Front</span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realperso.technologie_front}}</span>
                      </div>
                  }
                  @if (realperso.gestion_contenu != '') {
                      <div class='d-flex align-items-center'>
                        <span class='libtech1'>Gestion de contenu</span>
                        <i class="fa-solid fa-right-long mr-5"></i>
                        <span>{{ realperso.gestion_contenu}}</span>
                      </div>
                  }
                </div>
                <div class='d-flex flex-column flex-fill infobdd'>
                  <h3 class='titres mb-5'>Base de données</h3>
                  <span class='border2 mb-10'></span>
                  <div class='d-flex flex-column '>
                    {{ realperso.base_de_donnees}}
                  </div>
                </div>
                 
                
              </div>
               
              
            
            </div>
             
            
          </div> 
          @if (realperso.url_site != '') {
            <div class='d-flex infourl'>
              <h3>Lien vers le site : <a [href]="realperso.url_site" target='_blank' [style.color]="'rgb(0, 92, 187)'"> {{ realperso.url_site }}</a></h3>
            </div>
          }
          @if (realperso.github != '') {
            <div class='d-flex infourl'>
                <h3>Lien vers github : <a [href]="realperso.github" target='_blank' [style.color]="'rgb(0, 92, 187)'"> {{ realperso.github }}</a></h3>
            </div>
           }          
        </div>  
                }
    </mat-tab>
  </mat-tab-group>
              }
  `,
  styles: `
    :host {
      background:linear-gradient(90deg, white 0%, var(--gray-100) 100%);
      display:flex;
      flex-direction:column;
      padding:20px;
      flex:1;
      
      
    }
  `,
  styleUrl:'realisations.scss'
})
export class Realisations {
  realService = inject(RealService)
  realPerso = computed(() => this.realService.realResource.value()?.filter(({type}) => type === 'perso') || undefined)
  realPro = computed(() => this.realService.realResource.value()?.filter(({type}) => type === 'pro') || undefined)
  loading = signal(true)
  mode: ProgressSpinnerMode = 'indeterminate';

  
  constructor() {
    afterNextRender(() => {
      this.loading.set(false);
    })
  }

}


