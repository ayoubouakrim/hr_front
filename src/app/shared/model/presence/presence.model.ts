import {Time} from "@angular/common";
import {EmployeDto} from "../employe/employe.model";

export class PresenceDto {

  public id: number | null;
  public code: String;
  public heureArrivee: Time | null;
  public heureDepart: Time | null;
  public presence: boolean;
  public datee: Date | null;
  public nombreHeurePresence: number | null;
  public nombreHeureRetard: number | null;
  public employe: EmployeDto;


  constructor() {
    this.id = null;
    this.code = '';
    this.heureArrivee = null;
    this.heureDepart = null;
    this.presence = false;
    this.datee = null;
    this.nombreHeurePresence = null;
    this.nombreHeureRetard = null;
    this.employe = new EmployeDto();
  }
}
