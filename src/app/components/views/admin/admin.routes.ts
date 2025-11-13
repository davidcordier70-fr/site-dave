import { Route, Routes } from "@angular/router";
import { Admin } from "./admin";


export const routes:Routes = [
  {
  path:'',
  component:Admin,
  children: [
    {
      path:'categorys',
      loadChildren:async() => (await import('./views/admin-categorys/admin-categorys-route')).routes
    },
    {
      path:'competences',
      loadChildren:async() => (await import('./views/admin-competences/admin-competences-route')).routes
      
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'coktails'
    }
  ]
}
]
