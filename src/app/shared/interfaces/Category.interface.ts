export interface CategoryInterfaceGraph  {
  category_name:string,
  libelle:string | undefined,
  background:string,
  codeClass:string
}

export interface CategoryInterface  {
  _id:string,
  libelle:string,
  libelle_cat:string,
  background:string,
  codeClass:string;

}

export interface CategoryInterfaceForm  {
  libelle:string,
  libelle_cat:string,
  background:string,
  codeClass:string;
}



