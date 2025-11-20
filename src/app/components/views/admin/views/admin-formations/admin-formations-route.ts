import {  Routes } from "@angular/router";
import {  AdminFormationsList } from "./views/admin-formations-list";

import { AdminFormations } from "./admin-formations";
import { AdminFormationsForm } from "./views/admin-formations-form";


export const routes:Routes = [
  {
  path:'',
  component:AdminFormations,
  children: [
    {
      path:'listfor',
      component:AdminFormationsList
    },
    {
      path:'newfor',
      component:AdminFormationsForm
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'list'
    }
  ]
}
]
