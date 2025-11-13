export interface CompetenceInterface {
  _id:string,
  name:string,
  image:string,
  competences:string[],
  category_name:string

}

export interface CompetenceInterfaceForm {
  name:string,
  image:string,
  competences:string[],
  category_name:string

}

export interface CompetenceInterfaceFDisplay {
  namecat:string, 
  competences:CompetenceInterface[]

}