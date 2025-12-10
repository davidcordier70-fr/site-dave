import {Component, OnInit} from '@angular/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Query progress-bar
 */
@Component({
  selector: 'progress-bar-query-example',
  template: `
    <section class="example-section">
      <mat-progress-bar 
        [value]="progressValue"
          
         >
           
      </mat-progress-bar>
    </section>
  `,
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressBarModule],
})
export class ProgressBarQueryExample implements OnInit{
  mode: ProgressBarMode = 'determinate';
   progressValue = 50;
  

  ngOnInit(){
    
    this.progressValue = 100;
  
  }

  
  
  

  
     
  
  
  

}


/**  Copyright 2025 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */