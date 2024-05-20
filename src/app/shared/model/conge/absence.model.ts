
import {EmployeDto} from "../employe/employe.model";
import {TypeAbsenceDto} from "./type-absence.model";

export class AbsenceDto {

  public id: number | null;
  public code: string;
  public motif: string;
  public dateDebut: Date | null;
  public dateFin: Date | null;
  public duree: number | null;
  public type: TypeAbsenceDto;
  public ended: boolean;
  public employe: EmployeDto;


  constructor() {
    this.id = null;
    this.code = '';
    this.motif = '';
    this.dateDebut = null;
    this.dateFin = null;
    this.duree = null;
    this.type = new TypeAbsenceDto();
    this.ended = false;
    this.employe = new EmployeDto();
  }
}
