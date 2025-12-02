export interface CompetenceInterface {
  _id:string,
  name:string,
  image:string,
  competences:string[],
  category_name:string,
  padding_image:string,
  gradient:string

}

export interface CompetenceInterfaceForm {
  name:string,
  image:string,
  competences:string[],
  category_name:string,
  padding_image:string,
  gradient:string

}

export interface CompetenceInterfaceFDisplay {
  namecat:string, 
  competences:CompetenceInterface[]

}