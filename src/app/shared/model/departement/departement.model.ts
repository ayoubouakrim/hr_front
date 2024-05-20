import {EmployeDto} from "../employe/employe.model";

export class DepartementDto {
  public id: number | null;
  public code: String;
  public libelle:String;
  public dateCreation: Date | null;
  public chef: String;
  public nbrEmploye: number |null ;

  constructor() {
    this.id = null;
    this.code = '';
    this.libelle = '';
    this.dateCreation = null;
    this.chef = '';
    this.nbrEmploye = null;
  }
}
