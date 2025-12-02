import { Component } from '@angular/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-logout',
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressBarModule],
  template: `
    <section class="example-section">
      <label class="example-margin">Deconnexion en cours - Vous allez être redirigé vers la page de connexion</label>
      <mat-slider class="example-margin">
        <input type="range" [(ngModel)]="value" matSliderThumb>
      </mat-slider>
    </section>
  `,
  styles: ``,
})
export class Logout {

  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

}
