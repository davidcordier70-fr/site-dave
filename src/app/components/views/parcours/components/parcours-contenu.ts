import {ChangeDetectionStrategy, Component, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-contenu-parcours',
  template: `
  <div class="example-action-buttons">
      <button matButton (click)="accordion().openAll()">Tout développer</button>
      <button matButton (click)="accordion().closeAll()">Tout réduire</button>
  </div>
  <!-- #docregion multi -->
  <mat-accordion class="example-headers-align" multi>
    <!-- #enddocregion multi -->
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>Expériences</mat-panel-title>
        <mat-panel-description>
          Type your name and age
          <mat-icon>account_circle</mat-icon>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <mat-form-field>
        <mat-label>First name</mat-label>
      <input matInput />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Age</mat-label>
      <input matInput type="number" min="1" />
    </mat-form-field>
  </mat-expansion-panel>
   

  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title> Formation </mat-panel-title>
      <mat-panel-description>
        Inform the date you wish to travel
        <mat-icon>date_range</mat-icon>
      </mat-panel-description>
    </mat-expansion-panel-header>

    <mat-form-field>
      <mat-label>Date</mat-label>
      <input matInput [matDatepicker]="picker" (focus)="picker.open()" readonly />
    </mat-form-field>
    <mat-datepicker #picker></mat-datepicker>
  </mat-expansion-panel>
  
</mat-accordion>`,
  styles: '',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcoursContenu {
  accordion = viewChild.required(MatAccordion);
}