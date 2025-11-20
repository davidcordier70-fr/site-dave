import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/*import { CoktailsInterface, CoktailsInterfaceForm } from 'app/shared/interfaces';
import { CoktailsService } from 'app/shared/services/coktails-service';*/
import {ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ExperienceInterfaceForm } from '../../../../../../shared/interfaces/Experience.interface';
import { ParcoursService } from '../../../../../../shared/services/parcours.service';
import { concat } from 'rxjs';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-admin-experiences-form',
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,],
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
    {provide: MY_FORMATS, useValue: 'fr'},
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <form [formGroup]="formationForm" (submit)="submit()">
      <div class="d-flex gap-12 mb-10">
      <label>
          <input type="radio" value="ecole" formControlName="lieuFormation" (click)="requiredField('ecole')">
          <span>Ecole</span>
      </label>
      <label>
        <input type="radio" value="Plateforme" formControlName="lieuFormation" (click)="requiredField('plateforme')">
        <span>Plateforme</span>
      </label>
      </div>
      
      @if (showLieuFormation() === 'ecole') {
        <div class="d-flex flex-column gap-12 mb-10">
          <label for="ecole">Ecole / Etablissement scolaire</label>
          <input formControlName="ecole" id="ecole" type="text" (change)="requiredField('ecole')" />
          @if (ecoleControl.errors?.['required'] && (ecoleControl.touched ||
          ecoleControl.dirty)) {
            <p class="error">Le libellé de l'école est obligatoire</p>
          } @else if (ecoleControl.errors?.['minlength'] && (ecoleControl.touched ||
            ecoleControl.dirty)) {
          <p class="error">Le nom de l'établissement doit comporter au moins 2 caractères</p>
        }
        </div>
      }
      @if (showLieuFormation() === 'plateforme') {
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="plateforme">Plateforme de formation</label>
        <input formControlName="plateforme" id="plateforme" type="text" (change)="requiredField('plateforme')"/>
        @if (plateformeControl.errors?.['required'] && (plateformeControl.touched ||
        plateformeControl.dirty)) {
        <p class="error">Le libellé de la plateforme est obligatoire</p>
        } @else if (plateformeControl.errors?.['minlength'] && (plateformeControl.touched ||
        plateformeControl.dirty)) {
          <p class="error">Le nom de l'entreprise doit comporter au moins 2 caractères</p>
        }
      </div>
      }
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="title">Titre de la formation</label>
        <input formControlName="title" id="title" type="text" />
        @if (titreControl.errors?.['required'] && (titreControl.touched ||
        titreControl.dirty)) {
        <p class="error">Le titre de la formation est obligatoire</p>
        } 
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <mat-form-field >
          <mat-label for="datedeb" [class.labelddeb]="ddeb() === false" >Mois et année de début de l'expérience</mat-label>
          <input matInput [matDatepicker]="dp" [formControl]="datedeb" id="datedeb">
          <mat-hint>MM/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
          <mat-datepicker #dp
                          startView="multi-year"
                          (monthSelected)="setMonthAndYearDeb($event, dp)"
                          panelClass="example-month-picker">
          </mat-datepicker>
        </mat-form-field>

        @if (dateDebControl.errors?.['required'] && (dateDebControl.touched ||
        formationForm.dirty)) {
        <p class="error">Le mois et l'année de début de l'expérience est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <mat-form-field>
          <mat-label for="datedeb" [class.labeldfin]="dfin() === false">Mois et année de début de l'expérience</mat-label>
          <input matInput [matDatepicker]="dp2" [formControl]="datefin" id="datefin" >
          <mat-hint>MM/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="dp2"></mat-datepicker-toggle>
          <mat-datepicker #dp2
                          startView="multi-year"
                          (monthSelected)="setMonthAndYearEnd($event, dp2)"
                          panelClass="example-month-picker2">
          </mat-datepicker>
        </mat-form-field>
        @if (dateFinControl.errors?.['required'] && (dateFinControl.touched ||
        formationForm.dirty)) {
        <p class="error">Le mois et l'année de début de l'expérience est obligatoire</p>
        }
      </div>
      <div>
        <button
          [disabled]="formationForm.invalid"
          class="btn btn-primary"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  `,
  //host: { class: 'card' },
  styles: ` 
    form {
      
      color:black;
    }

    .labelddeb {
      color:red;
    }

    .labeldfin {
      color:red;
    }
  
    .card { padding: 8px; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormationsForm implements OnInit{
  private fb = inject(FormBuilder);
  private parcoursService = inject(ParcoursService);
  private router = inject(Router);
  experiences = computed(() => this.parcoursService.FormationResource.value());
  //isLoading = signal(false);
  ddeb = signal(false)
  dfin = signal(false)
  showLieuFormation=signal<string>('ecole');
    

  formationForm = this.fb.group({
    lieuFormation:['', Validators.required],
    ecole:[''],
    plateforme:[''],
    title:['', Validators.required],
    montYearDeb: [moment(), Validators.required],
    montYearFin: [moment(), Validators.required],
    
  });

  requiredField(champ: string) {
    console.log(champ)
    if (champ == 'ecole') {
      this.showLieuFormation.set('ecole');
      this.ecoleControl.addValidators([Validators.required, Validators.minLength(2)])
      this.plateformeControl.removeValidators([Validators.required, Validators.minLength(2)])
    } else {
      this.showLieuFormation.set('plateforme');
      this.plateformeControl.addValidators([Validators.required, Validators.minLength(2)])
      this.ecoleControl.removeValidators([Validators.required, Validators.minLength(2)])
    }
  }

  readonly datedeb = new FormControl(moment());
  setMonthAndYearDeb(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.ddeb.set(true)
    const ctrlValue = this.datedeb.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.datedeb.setValue(ctrlValue);
    this.formationForm.get('montYearDeb')?.setValue(this.datedeb.value)
    datepicker.close();
  }

  readonly datefin = new FormControl(moment());
  setMonthAndYearEnd(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.dfin.set(true)
    const ctrlValue = this.datefin.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.datefin.setValue(ctrlValue);
    this.formationForm.get('montYearFin')?.setValue(this.datefin.value)
    datepicker.close();
  }

  

  get dateDebControl() {
    return this.datedeb;
  }

  get dateFinControl() {
    return this.datefin;
  }
  

  get ecoleControl() {
    return this.formationForm.get('ecole') as FormControl;
  }

  get plateformeControl() {
    return this.formationForm.get('plateforme') as FormControl;
  }

  get titreControl() {
    return this.formationForm.get('title') as FormControl;
  }

  async submit() {
    //this.isLoading.set(true);
    console.log(this.formationForm.valid)
    console.log(this.ddeb())
    console.log(this.dfin())
    
    if (this.formationForm.valid && this.ddeb() && this.dfin()) {
     console.log(this.formationForm.getRawValue().montYearDeb?.utc().month());

     
     
     let yearDeb=<string>(''); 
     let moisDeb=<number>(0); 
     moisDeb = Number(this.formationForm.getRawValue().montYearDeb?.month()) + 1 
     const infmoisdeb =  Number(this.formationForm.getRawValue().montYearDeb?.month()) < 9 ? true : false
     console.log(infmoisdeb)
     
     yearDeb = this.formationForm.getRawValue().montYearDeb?.year().toString() as string
     const montYearDeb = (infmoisdeb ? "0" + moisDeb.toString() : moisDeb.toString()) + yearDeb
     //console.log(montYearDeb)
     let moisFin=<number>(0); 
     let yearEnd=<string>('');
     moisFin =  Number(this.formationForm.getRawValue().montYearFin?.month()) + 1
     const infmoisFin =  Number(this.formationForm.getRawValue().montYearFin?.month()) < 9 ? true : false
     yearEnd = this.formationForm.getRawValue().montYearFin?.year().toString() as string
     const montYearFin = (infmoisFin ? "0" + moisFin.toString() : moisFin.toString()) + yearEnd
     //console.log(montYearFin)
    
     
    try {
        await this.parcoursService.addFormation({
            ecole: this.formationForm.getRawValue().ecole,
            plateforme: this.formationForm.getRawValue().plateforme,
            title: this.formationForm.getRawValue().title,
            montYearDeb: montYearDeb,
            montYearFin: montYearFin,
        }
         
          
        );
      
      this.router.navigateByUrl('/admin/formations/listfor');
    } catch (e) {
    } 
  }
  }
  ngOnInit(): void {
    this.formationForm.get('lieuFormation')?.setValue('ecole')
   this.datedeb.setValue(this.datedeb.defaultValue)
    this.datefin.setValue(this.datefin.defaultValue)
    
  }   
}



