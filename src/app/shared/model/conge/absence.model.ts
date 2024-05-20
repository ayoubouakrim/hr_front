
import {EmployeDto} from "../employe/employe.model";
import {TypeAbsenceDto} from "./type-absence.model";
import {EtatCongeDto} from "./etat-conge.model";

export class AbsenceDto {

  public id: number | null;
  public code: String;
  public motif: String;
  public dateDebut: Date | null;
  public dateFin: Date | null;
  public duree: number | null;
  public type: TypeAbsenceDto;
  public etat: EtatCongeDto;
  public employe: EmployeDto;


  constructor() {
    this.id = null;
    this.code = '';
    this.motif = '';
    this.dateDebut = null;
    this.dateFin = null;
    this.duree = null;
    this.type = new TypeAbsenceDto();
    this.etat = new EtatCongeDto();
    this.employe = new EmployeDto();
  }
}
