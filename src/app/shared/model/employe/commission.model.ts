import {EmployeDto} from "./employe.model";

export class CommissionDto {
  public id: number | null;
  public code: String;
  public objectif : String;
  public montant : number | null;
  public mois : number | null;
  public employe: EmployeDto;
  public annee : number | null;
  public archive: boolean;

  constructor() {
    this.id = null;
    this.code = '';
    this.objectif = '';
    this.montant = null;
    this.mois = null;
    this.employe = new EmployeDto();
    this.annee = null;
    this.archive = false;
  }
}
