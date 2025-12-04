import { Injectable, resource } from '@angular/core';
import { CategoryInterface, CategoryInterfaceForm, ContactInterface, ContactInterfaceForm } from '../interfaces';

const BASE_URL='/api/messages'

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  

  async createMessage(message: ContactInterfaceForm): Promise<ContactInterface> {
      const response = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        return body as ContactInterface;
      } else {
        throw new Error(body);
      }
    }
  
}
