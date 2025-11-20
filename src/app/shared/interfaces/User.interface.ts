export interface User {
  _id: string | null;
  nom: string | null;
  prenom: string | null;
  noment: string | null;
  email: string;
}

export interface ProfilForm {
  nom: string | null;
  prenom: string | null;
  noment: string | null;
  email: string;
}

export interface UserForm {
  email: string | null;
  nom: string;
  prenom: string;
  noment: string;
  password: string | null;
}

export interface SigninForm {
  email: string;
  password: string;
}