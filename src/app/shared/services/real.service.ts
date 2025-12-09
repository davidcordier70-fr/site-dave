import { Injectable, resource } from '@angular/core';
import { Realisations } from './../interfaces/realisations.interface';

@Injectable({
  providedIn: 'root',
})
export class RealService {
  BASE_URL='/api/realisations'
  
  realResource=resource({
    loader:async():Promise<Realisations[]> => await (await fetch(`${this.BASE_URL}/`)).json()})
  
}
