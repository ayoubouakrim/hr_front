import {EmployeDto} from "../employe/employe.model";

export class DepartementDto {
  public id: number | null;
  public code: String;
  public libelle:String;
  public dateCreation: Date | null;
  public chef: EmployeDto | null;
  public nbrEmploye: number |null ;

  constructor() {
    this.id = null;
    this.code = '';
    this.libelle = '';
    this.dateCreation = null;
    this.chef = null;
    this.nbrEmploye = null;
  }
}
