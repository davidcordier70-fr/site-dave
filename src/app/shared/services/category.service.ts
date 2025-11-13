import { Injectable, resource } from '@angular/core';
import { CategoryInterface, CategoryInterfaceForm } from '../interfaces';

const BASE_URL = '/api/categorys';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  

  categoryResource=resource({
    loader:async():Promise<CategoryInterface[]> => await (await fetch(`${BASE_URL}/`)).json()
  })

  async addCategory(category:CategoryInterfaceForm) {

    try {

    const response = await (fetch(`${BASE_URL}/`, {
      method:'POST',
      body : JSON.stringify(category),
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Sec-Fetch-Site':'cross-site'
      }
    }))

    const body = await response.json();

    if (response.ok) {

      this.categoryResource.update((categorys) => categorys ? [...categorys, body] : body)

    } else {
      throw new Error('Oops !')
    }

    } catch {
      throw new Error('Oops !')
    }


  }

  async deleteCategory(categoryId:string) {
    try {

     const response = await fetch(`${BASE_URL}/${categoryId}`, {
      method:'DELETE',
     });

    if (response.ok) {
       this.categoryResource.update((categorys) => categorys?.filter(({_id})=> _id !== categoryId))

    } else {
      throw new Error('Oops !')
    }

    } catch {
      throw new Error('Oops !')
    }

  }
  
}
