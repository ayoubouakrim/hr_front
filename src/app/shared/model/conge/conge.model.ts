import {TypeCongeDto} from "./type-conge.model";
import {EmployeDto} from "../employe/employe.model";

export class CongeDto {
  public id: number | null;
  public code: String;
  public motif: String;
  public dateDebut: Date | null;
  public dateFin: Date | null;
  public duree: number | null;
  public type: TypeCongeDto;
  public ended: boolean;
  public employe: EmployeDto;


  constructor() {
    this.id = null;
    this.code = '';
    this.motif = '';
    this.dateDebut = null;
    this.dateFin = null;
    this.duree = null;
    this.type = new TypeCongeDto();
    this.ended = false;
    this.employe = new EmployeDto();
  }
}
