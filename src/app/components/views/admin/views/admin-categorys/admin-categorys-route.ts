import {  Routes } from "@angular/router";
import { AdminCategorysList } from "./views/admin-categorys-list";

import { AdminCategorys } from "./admin-categorys";
import { AdminCategorysForm } from "./views/admin-categorys-form";


export const routes:Routes = [
  {
  path:'',
  component:AdminCategorys,
  children: [
    {
      path:'listcat',
      component:AdminCategorysList
    },
    {
      path:'newcat',
      component:AdminCategorysForm
    },
    {
      path:'',
      pathMatch:"full",
      redirectTo:'list'
    }
  ]
}
]
