import {  Routes } from "@angular/router";
import { AdminCompetencesList } from "./views/admin-competences-list";

import { AdminCompetences } from "./admin-competences";
import { AdminCompetencesForm } from "./views/admin-competences-form";


export const routes:Routes = [
  {
  path:'',
  component:AdminCompetences,
  children: [
    {
      path:'listcomp',
      component:AdminCompetencesList
    },
    {
      path:'newcomp',
      component:AdminCompetencesForm
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'list'
    }
  ]
}
]
