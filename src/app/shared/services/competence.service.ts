import { Injectable, resource } from '@angular/core';
import { CategoryInterface, CategoryInterfaceForm, CompetenceInterface, CompetenceInterfaceForm } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompetenceService {

  BASE_URL='http://localhost:4200/api/competences'

  competenceResource=resource({
    loader:async():Promise<CompetenceInterface[]> => await (await fetch(`${this.BASE_URL}/`)).json()
  })

  async addCompetence(competence:CompetenceInterfaceForm) {

    try {

    const response = await (fetch(`${this.BASE_URL}/`, {
      method:'POST',
      body : JSON.stringify(competence),
      headers: {
        'Content-type': 'application/json',
      }
    }))

    const body = await response.json();

    if (response.ok) {

      this.competenceResource.update((competences) => competences ? [...competences, body] : body)

    } else {
      throw new Error('Oops !')
    }

    } catch {
      throw new Error('Oops !')
    }


  }

  async deleteCcompetence(competenceId:string) {
    try {

     const response = await fetch(`${this.BASE_URL}/${competenceId}`, {
      method:'DELETE',
     });

    if (response.ok) {
       this.competenceResource.update((competences) => competences?.filter(({_id})=> _id !== competenceId))

    } else {
      throw new Error('Oops !')
    }

    } catch {
      throw new Error('Oops !')
    }

  }

  async editCompetence(competence: CompetenceInterface) {
    const { _id, ...restCompetence } = competence;
    const response = await fetch(`${this.BASE_URL}/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(restCompetence),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      this.competenceResource.reload();
    } else {
      throw new Error(body);
    }
  }
  
}
