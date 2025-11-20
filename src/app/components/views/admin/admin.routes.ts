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
      path:'experiences',
      loadChildren:async() => (await import('./views/admin-experiences/admin-experiences-route')).routes
      
    },
    {
      path:'formations',
      loadChildren:async() => (await import('./views/admin-formations/admin-formations-route')).routes
      
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'coktails'
    }
  ]
}
]
