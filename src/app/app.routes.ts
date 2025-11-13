import { Route, Routes } from "@angular/router";
import { NotFound } from "./components/views/not-found";
import { Home } from "./components/views/Home/home"
import { authGuard } from "./shared/guards/auth-guard";


export const routes:Routes = [
{
    path:"categorys/:id",
    loadComponent: async () => (await import ('./components/views/categorys/category')).Category

  },
  {
    path:"categorys",
    loadComponent: async () => (await import ('./components/views/categorys/category')).Category

  },
  {
    path:'admin',
    canActivate:[authGuard],
    loadChildren:async() => (await import('./components/views/admin/admin.routes')).routes
  },
  {
    path:'signin',
    loadComponent: async () => (await import ('./components/views/signin/signin')).Signin
  },
  {
    path:'signup',
    loadComponent: async () => (await import ('./components/views/signup/signup')).Signup
  },
  {
    path:'contact',
    canActivate:[authGuard],
    loadComponent: async () => (await import ('./components/views/contact/contact')).Contact
  },
  {
    path:'profil',
    canActivate:[authGuard],
    loadComponent: async () => (await import ('./components/views/contact/contact')).Contact
  },
  {
    path:'',
    component:Home
  },
  {
    path:'',
    pathMatch:"full",
    redirectTo:''
  },
  {
    path:'**',
    component:NotFound
  }
]
