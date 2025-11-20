import {  Routes } from "@angular/router";
import {  AdminExperiencesList } from "./views/admin-experiences-list";

import { AdminExperiences } from "./admin-experiences";
import { AdminExperiencesForm } from "./views/admin-experiences-form";


export const routes:Routes = [
  {
  path:'',
  component:AdminExperiences,
  children: [
    {
      path:'listexp',
      component:AdminExperiencesList
    },
    {
      path:'newexp',
      component:AdminExperiencesForm
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'list'
    }
  ]
}
]
