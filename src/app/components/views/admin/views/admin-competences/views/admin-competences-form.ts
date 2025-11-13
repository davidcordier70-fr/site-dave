import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetenceService } from '../../../../../../shared/services/competence.service';
import { CategoryService } from '../../../../../../shared/services/category.service';
import { CompetenceInterface, CompetenceInterfaceForm } from '../../../../../../shared/interfaces';
/*import { CoktailsInterface, CoktailsInterfaceForm } from 'app/shared/interfaces';
import { CoktailsService } from 'app/shared/services/coktails-service';*/

@Component({
  selector: 'app-admin-competences-form',
  imports: [ReactiveFormsModule],
  template: `
    @if (this.competenceId) {
    <h3 class="mb-20">Modification d'un catégorie</h3>
    } @else {
    <h3 class="mb-20">Création d'une catégorie</h3>
    }
    <form [formGroup]="competenceForm" (submit)="submit()">
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="name">Libellé de la compétence</label>
        <input formControlName="name" id="name" type="text" />
        @if (nameControl.errors?.['required'] && (nameControl.touched ||
        competenceForm.dirty)) {
        <p class="error">Le libellé de la compétence est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="image">Image</label>
        <input formControlName="image" id="image" type="text" />
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="category_name">Catégorie</label>
        <select id="category_name" formControlName="category_name">
          @for (category of categorys(); track category._id) {
            <option [value]="category.libelle">{{ category.libelle}}</option>
          }
        </select>
      </div>
      <div class="mb-20">
        <div class="d-flex align-items-center gap-12 mb-10">
          <label class="flex-auto">Competences</label>
          <button
            type="button"
            (click)="addCompetence()"
            class="btn btn-primary"
          >
            Ajouter
          </button>
        </div>
        <ul formArrayName="competences">
          @for(competence of competencesControl.controls; track $index) {
          <li class="d-flex align-items-center gap-12 mb-10">
            <input class="flex-auto" [formControlName]="$index" type="text" />
            <button (click)="deleteCompetence($index)" type='button' class="btn btn-danger">
              Supprimer
            </button>
          </li>
          }
        </ul>
      </div>
      <div>
        <button
          [disabled]="competenceForm.invalid || this.isLoading()"
          class="btn btn-primary"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  `,
  host: { class: 'card' },
  styles: ` .card { padding: 8px; }`,
})
export class AdminCompetencesForm {
  private fb = inject(FormBuilder);
  private competenceService = inject(CompetenceService);
  private categoryService = inject(CategoryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  competences = computed(() => this.competenceService.competenceResource.value());
  categorys = computed(() => this.categoryService.categoryResource.value());
  competenceId = toSignal(this.activatedRoute.params)()!['id'];
  isLoading = signal(false);

  competenceForm = this.fb.group({
    name: ['', Validators.required],
    image: [''],
    competences: this.fb.array([]),
    category_name:['']
  });

  /*initCocktailFormEffect = effect(() => {
    console.log(this.cocktailId)
    if (this.cocktailId) {
      const cocktails = this.cocktails();
      if (cocktails) {
        const { name, imageUrl, description, ingredients } = cocktails.find(
          ({ _id }) => this.cocktailId === _id
        )!;
        this.cocktailForm.patchValue({
          name,
          imageUrl,
          description,
        });
        ingredients.forEach((i) =>
          this.ingredientsControl.push(this.fb.control(i))
        );
        this.initCocktailFormEffect.destroy();
      }
    } else {
      this.initCocktailFormEffect.destroy();
    }
  });*/

  get competencesControl() {
    return this.competenceForm.get('competences') as FormArray;
  }

  get nameControl() {
    return this.competenceForm.get('name') as FormControl;
  }

  deleteCompetence(index: number) {
    this.competencesControl.removeAt(index);
  }

  addCompetence() {
    this.competencesControl.push(this.fb.control(''));
  }

  async submit() {
    this.isLoading.set(true);
    try {
      if (this.competenceId) {
        await this.competenceService.editCompetence({
          ...this.competenceForm.getRawValue(),
          _id: this.competenceId,
        } as CompetenceInterface);
      } else {
        await this.competenceService.addCompetence(
          this.competenceForm.getRawValue() as CompetenceInterfaceForm
        );
      }
      this.router.navigateByUrl('/admin/competences/listcomp');
    } catch (e) {
    } finally {
      this.isLoading.set(false);
    }
  }
}