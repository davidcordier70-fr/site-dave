import { computed, inject, Injectable, resource } from '@angular/core';
import { CategoryInterface, CategoryInterfaceForm, CompetenceInterface, CompetenceInterfaceForm, ProfilForm, User, UserForm } from '../interfaces';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const API_USERS = '/api/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  authService = inject(AuthService)
  readonly router = inject(Router);
  

  async createUser(user: UserForm): Promise<User> {
    const response = await fetch(API_USERS, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      return body as User;
    } else {
      throw new Error(body);
    }
  }

   async modifUser(profil: User) {
    const { _id, ...restProfil } = profil;
    const response = await fetch(`${API_USERS}${_id}/infos/`, {
      method: 'PATCH',
      body: JSON.stringify(restProfil),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      return body as User
    } else {
      throw new Error(body);
    }
  }

  async deleteUser(user: User) {
    const { _id } = user;
    
    const response = await fetch(`${API_USERS}${_id}/`, {
      method: 'DELETE',
    });
    if (response.ok) {
      this.authService.currentUserResource.reload();
      console.log('OK')
      this.router.navigateByUrl('/signin');
    } else {
      throw new Error('Erreur lors de la suppression du compte');
    }
    
    
  }

  
   async modifPassword(user: User) {
    const { _id, ...restUser } = user;
    const response = await fetch(`${API_USERS}${_id}/password/`, {
      method: 'PATCH',
      body: JSON.stringify(restUser),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      return body as User
    } else {
      throw new Error(body);
    }
  }
  
}
