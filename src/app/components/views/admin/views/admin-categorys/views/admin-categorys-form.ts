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
import { CategoryInterfaceForm } from '../../../../../../shared/interfaces';
/*import { CoktailsInterface, CoktailsInterfaceForm } from 'app/shared/interfaces';
import { CoktailsService } from 'app/shared/services/coktails-service';*/

@Component({
  selector: 'app-admin-categorys-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="categoryForm" (submit)="submit()">
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="libelle">Libellé de la catégorie</label>
        <input formControlName="libelle" id="libelle" type="text" />
        @if (libelleControl.errors?.['required'] && (libelleControl.touched ||
        categoryForm.dirty)) {
        <p class="error">Le libellé de la catégorie est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="libelle_cat">Libellé lien catégorie</label>
        <input formControlName="libelle_cat" id="libelle_cat" type="text" />
        @if (libelleCatControl.errors?.['required'] && (libelleCatControl.touched ||
        categoryForm.dirty)) {
        <p class="error">Le libellé du lien de la catégorie est obligatoire</p>
        }
      </div>
      <div class="d-flex flex-column gap-12 mb-10">
        <label for="libelle_cat">Couleur fond début gradient</label>
        <input formControlName="libelle_cat" id="libelle_cat" type="text" />
        @if (libelleCatControl.errors?.['required'] && (libelleCatControl.touched ||
        categoryForm.dirty)) {
        <p class="error">Le libellé du lien de la catégorie est obligatoire</p>
        }
      </div>
      <div>
        <button
          [disabled]="categoryForm.invalid || this.isLoading()"
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
export class AdminCategorysForm {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  categorys = computed(() => this.categoryService.categoryResource.value());
  isLoading = signal(false);

  categoryForm = this.fb.group({
    libelle: ['', Validators.required],
    libelle_cat: ['', Validators.required],
    
  });

  get libelleControl() {
    return this.categoryForm.get('libelle') as FormControl;
  }

  get libelleCatControl() {
    return this.categoryForm.get('libelle_cat') as FormControl;
  }

  async submit() {
    this.isLoading.set(true);
    try {
      await this.categoryService.addCategory(
          this.categoryForm.getRawValue() as CategoryInterfaceForm
        );
      
      this.router.navigateByUrl('/admin/categorys/listcat');
    } catch (e) {
    } finally {
      this.isLoading.set(false);
    }
  }
}