export interface User {
  _id: string;
  nom: string;
  prenom: string;
  noment: string;
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