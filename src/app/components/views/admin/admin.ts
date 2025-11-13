import { Component } from '@angular/core';
import { AdminNavbar } from "./components/admin-navbar";
import { RouterOutlet } from "@angular/router"

@Component({
  selector: 'app-admin',
  imports: [AdminNavbar, RouterOutlet],
  template: `
    <app-admin-navbar />
    <router-outlet />

  `,
  host: {
    class:'d-flex flex-row flex-fill'
  },
  styles: `

  `
})
export class Admin {

}
