import moment, { Moment } from "moment"

export interface ExperienceInterface {
_id:string,
 titre: string,
 noment: string,
 typContrat: string,
 montYearDeb: string,
 montYearFin:string,
 lieu:string | null,
 missions:string[],
 postes_occupes:string[],
 technologies:string[],
 image:String | null
}

export interface ExperienceInterfaceForm {
 titre: string | null,
 noment: string | null,
 typContrat: string | null,
 montYearDeb: String,
 montYearFin:String,
 lieu:string | null,
 missions:string[],
 postes_occupes:string[],
 technologies:string[],
 image:String | null
}