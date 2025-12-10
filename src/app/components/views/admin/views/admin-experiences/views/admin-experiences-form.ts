import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { ParcoursService } from '../../../../../../shared/services/parcours.service';

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
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <form [formGroup]="experienceForm" (submit)="submit()">
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="titre">Titre de l'expérience</label>
        <input formControlName="titre" id="titre" type="text" />
        @if (titreControl.errors?.['required'] && (titreControl.touched ||
        experienceForm.dirty)) {
          <p class="error">Le titre de l'expérience est obligatoire</p>
        } @else if (titreControl.errors?.['minlength'] && (titreControl.touched ||
        experienceForm.dirty)) {
          <p class="error">Le titre de l'expérience doit comporter au moins 2 caractères</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="noment">Nom de l'entreprise</label>
        <input formControlName="noment" id="noment" type="text" />
        @if (nomentControl.errors?.['required'] && (nomentControl.touched ||
        experienceForm.dirty)) {
        <p class="error">Le nom de l'entreprise est obligatoire</p>
        } @else if (nomentControl.errors?.['minlength'] && (nomentControl.touched ||
        experienceForm.dirty)) {
          <p class="error">Le nom de l'entreprise doit comporter au moins 2 caractères</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="typContrat">TYpe de contrat</label>
        <select id="typContrat" formControlName="typContrat">
          <option value="">Choisir un type de contrat ...</option>
          <option value="CDD">CDD</option>
          <option value="CDI">CDI</option>
        </select>
        @if (typeContratControl.errors?.['required'] && (typeContratControl.touched ||
        experienceForm.dirty)) {
        <p class="error">Le type de contrat est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="lieu">Lieu l'entreprise</label>
        <input formControlName="lieu" id="lieu" type="text" />
        @if (lieuControl.errors?.['required'] && (lieuControl.touched ||
        experienceForm.dirty)) {
        <p class="error">Le lieu de l'entreprise est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <mat-form-field>
          <mat-label for="datedeb"  [class.labelddeb]="ddeb() === false">Mois et année de début de l'expérience</mat-label>
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
        experienceForm.dirty)) {
        <p class="error">Le mois et l'année de début de l'expérience est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <mat-form-field>
          <mat-label for="datefin" [class.labeldfin]="dfin() === false">Mois et année de début de l'expérience</mat-label>
          <input matInput [matDatepicker]="dp2" [formControl]="datefin" id="datefin">
          <mat-hint>MM/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="dp2"></mat-datepicker-toggle>
          <mat-datepicker #dp2
                          startView="multi-year"
                          (monthSelected)="setMonthAndYearEnd($event, dp2)"
                          panelClass="example-month-picker">
          </mat-datepicker>
        </mat-form-field>
        @if (dateFinControl.errors?.['required'] && (dateFinControl.touched ||
        experienceForm.dirty)) {
        <p class="error">Le mois et l'année de début de l'expérience est obligatoire</p>
        }
      </div>
      <div class="mb-20">
      <div class="d-flex align-items-center gap-12 mb-10">
          <label class="flex-auto">Ingredients</label>
          <button
            type="button"
            (click)="addMission()"
            class="btn btn-primary"
          >
            Ajouter
          </button>
        </div>
      <ul formArrayName="missions">
          @for(competence of missionsControl.controls; track $index) {
          <li class="d-flex align-items-center gap-12 mb-10">
            <input class="flex-auto" [formControlName]="$index" type="text" />
            <button (click)="deleteMission($index)" type='button' class="btn btn-danger">
              Supprimer
            </button>
          </li>
          }
        </ul>
      </div>
      <div>
        <button
          [disabled]="experienceForm.invalid"
          class="btn btn-primary"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  `,
  //host: { class: 'card' },
  styles: ` 
  
  .card { 
     padding: 8px; 
  }
    
     form {
      
      color:black;
    }

    .labelddeb {
      color:red;
    }

    .labeldfin {
      color:red;
    }
  
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminExperiencesForm {
  private fb = inject(FormBuilder);
  private parcoursService = inject(ParcoursService);
  private router = inject(Router);
  experiences = computed(() => this.parcoursService.experienceResource.value());
  ddeb = signal(false)
  dfin = signal(false)

  experienceForm = this.fb.group({
    titre: ['', [Validators.required, Validators.minLength(2)]],
    noment: ['', [Validators.required, Validators.minLength(2)]],
    typContrat:['', Validators.required],
    montYearDeb: [moment(), Validators.required],
    montYearFin: [moment(), Validators.required],
    lieu: ['', Validators.required],
    missions: this.fb.array([]),
    postes_occupes: this.fb.array([]),
    technologies: this.fb.array([]),
    image: ['', Validators.required],
  });

  readonly datedeb = new FormControl(moment());
  setMonthAndYearDeb(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.ddeb.set(true);
    const ctrlValue = this.datedeb.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.datedeb.setValue(ctrlValue);
    this.experienceForm.get('montYearDeb')?.setValue(this.datedeb.value)
    datepicker.close();
  }

  readonly datefin = new FormControl(moment());
  setMonthAndYearEnd(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.dfin.set(true);
    const ctrlValue = this.datefin.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.datefin.setValue(ctrlValue);
    this.experienceForm.get('montYearFin')?.setValue(this.datefin.value)
    datepicker.close();
  }

  deleteMission(index: number) {
    this.missionsControl.removeAt(index);
  }

  addMission() {
    this.missionsControl.push(this.fb.control(''));
  }

  

  get dateDebControl() {
    return this.datedeb;
  }

  get dateFinControl() {
    return this.datefin;
  }
  

  get titreControl() {
    return this.experienceForm.get('titre') as FormControl;
  }

  get nomentControl() {
    return this.experienceForm.get('noment') as FormControl;
  }

  get typeContratControl() {
    return this.experienceForm.get('typContrat') as FormControl;
  }

  get lieuControl() {
    return this.experienceForm.get('lieu') as FormControl;
  }

  get missionsControl() {
    return this.experienceForm.get('missions') as FormArray;
  }

  async submit() {
      this.experienceForm.getRawValue().missions.forEach((value) => console.log(value))
      if (this.experienceForm.valid && this.ddeb() && this.dfin()) {
      console.log(this.experienceForm.getRawValue().montYearDeb?.utc().month());

      
      
      let yearDeb=<string>(''); 
      let moisDeb=<number>(0); 
      moisDeb = Number(this.experienceForm.getRawValue().montYearDeb?.month()) + 1 
      const infmoisdeb =  Number(this.experienceForm.getRawValue().montYearDeb?.month()) < 9 ? true : false
      console.log(infmoisdeb)
      
      yearDeb = this.experienceForm.getRawValue().montYearDeb?.year().toString() as string
      const montYearDeb = (infmoisdeb ? "0" + moisDeb.toString() : moisDeb.toString()) + yearDeb
      let moisFin=<number>(0); 
      let yearEnd=<string>('');
      moisFin =  Number(this.experienceForm.getRawValue().montYearFin?.month()) + 1
      const infmoisFin =  Number(this.experienceForm.getRawValue().montYearFin?.month()) < 9 ? true : false
      yearEnd = this.experienceForm.getRawValue().montYearFin?.year().toString() as string
      const montYearFin = (infmoisFin ? "0" + moisFin.toString() : moisFin.toString()) + yearEnd
            
      
      try {
          await this.parcoursService.addExperience({
              titre: this.experienceForm.getRawValue().titre,
              noment: this.experienceForm.getRawValue().noment,
              typContrat:this.experienceForm.getRawValue().typContrat,
              montYearDeb: montYearDeb,
              montYearFin: montYearFin,
              lieu: this.experienceForm.getRawValue().lieu,
              missions:this.experienceForm.getRawValue().missions as string[],
              postes_occupes:this.experienceForm.getRawValue().postes_occupes as string[],
              technologies:this.experienceForm.getRawValue().technologies as string[],
              image: this.experienceForm.getRawValue().image,
          })
          this.router.navigateByUrl('/admin/experiences/listexp');
            
                 
        
      } catch (e) {
      } 
  }
  }

  ngOnInit(): void {
    
   this.datedeb.setValue(this.datedeb.defaultValue)
    this.datefin.setValue(this.datefin.defaultValue)
    
  }  
}


