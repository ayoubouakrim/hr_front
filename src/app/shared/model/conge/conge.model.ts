import {TypeCongeDto} from "./type-conge.model";
import {EmployeDto} from "../employe/employe.model";
import {EtatCongeDto} from "./etat-conge.model";

export class CongeDto {
  public id: number | null;
  public code: string;
  public motif: string;
  public dateDebut: Date | null;
  public dateFin: Date | null;
  public duree: number | null;
  public type: TypeCongeDto;
  public etat: EtatCongeDto;
  public employe: EmployeDto;


  constructor() {
    this.id = null;
    this.code = '';
    this.motif = '';
    this.dateDebut = null;
    this.dateFin = null;
    this.duree = null;
    this.type = new TypeCongeDto();
    this.etat = new EtatCongeDto();
    this.employe = new EmployeDto();
  }
}
