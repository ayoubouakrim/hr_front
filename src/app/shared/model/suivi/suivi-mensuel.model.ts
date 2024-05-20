import {EmployeDto} from "../employe/employe.model";

export class SuiviMensuelDto {

  public id: number | null;
  public code: String;
  public paieMontant: number | null;
  public nbrHeuresRetard: number | null;
  public nbrHeuresPresente: number | null;
  public mois: number | null;
  public annee: number | null;
  public employe: EmployeDto;


  constructor( ) {
    this.id = null;
    this.code = '';
    this.paieMontant = null;
    this.nbrHeuresRetard = null;
    this.nbrHeuresPresente = null;
    this.mois = null;
    this.annee = null;
    this.employe = new EmployeDto();
  }
}
