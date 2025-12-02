import { computed, inject, Injectable, resource } from '@angular/core';
import { CategoryInterface, CategoryInterfaceForm, CompetenceInterface, CompetenceInterfaceForm, ProfilForm, User, UserForm } from '../interfaces';
import { AuthService } from './auth.service';

const API_USERS = '/api/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  authService = inject(AuthService)

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
