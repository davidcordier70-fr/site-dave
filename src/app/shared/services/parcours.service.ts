import { Injectable, resource } from '@angular/core';
import { FormationInterface, FormationInterfaceForm } from '../interfaces/Formation.Interface';
import { ExperienceInterface, ExperienceInterfaceForm } from '../interfaces/Experience.interface';

@Injectable({
  providedIn: 'root',
})
export class ParcoursService {
  BASE_URL='/api/parcours'

  experienceResource=resource({
    loader:async():Promise<ExperienceInterface[]> => await (await fetch(`${this.BASE_URL}/experiences`)).json()
  })

  FormationResource=resource({
    loader:async():Promise<FormationInterface[]> => await (await fetch(`${this.BASE_URL}/formations`)).json()
  })


  async addExperience(experience:ExperienceInterfaceForm) {
  
      try {
  
      const response = await (fetch(`${this.BASE_URL}/experiences/`, {
        method:'POST',
        body : JSON.stringify(experience),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Sec-Fetch-Site':'cross-site'
        }
      }))
  
      const body = await response.json();
  
      if (response.ok) {
  
        this.experienceResource.update((experiences) => experiences ? [...experiences, body] : body)
  
      } else {
        throw new Error('Oops !')
      }
  
      } catch {
        throw new Error('Oops !')
      }
  
  
    }
  
    async deleteExperience(experienceId:string) {
      try {
  
       const response = await fetch(`${this.BASE_URL}/${experienceId}`, {
        method:'DELETE',
       });
  
      if (response.ok) {
         this.experienceResource.update((experiences) => experiences?.filter(({_id})=> _id !== experienceId))
  
      } else {
        throw new Error('Oops !')
      }
  
      } catch {
        throw new Error('Oops !')
      }
  
    }

    async addFormation(formation:FormationInterfaceForm) {
  
      try {
  
      const response = await (fetch(`${this.BASE_URL}/formations/`, {
        method:'POST',
        body : JSON.stringify(formation),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Sec-Fetch-Site':'cross-site'
        }
      }))
  
      const body = await response.json();
  
      if (response.ok) {
  
        this.FormationResource.update((formations) => formations ? [...formations, body] : body)
  
      } else {
        throw new Error('Oops !')
      }
  
      } catch {
        throw new Error('Oops !')
      }
  
  
    }
  
    async deleteEFormation(formationId:string) {
      try {
  
       const response = await fetch(`${this.BASE_URL}/${formationId}`, {
        method:'DELETE',
       });
  
      if (response.ok) {
         this.FormationResource.update((formations) => formations?.filter(({_id})=> _id !== formationId))
  
      } else {
        throw new Error('Oops !')
      }
  
      } catch {
        throw new Error('Oops !')
      }
  
    }
    
  }
  

  

