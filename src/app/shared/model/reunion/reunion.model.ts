import {Time} from "@angular/common";
import {EmployeDto} from "../employe/employe.model";

export class ReunionDto {
  public id: number | null;
  public code: String;
  public title: String;
  public objectif: String;
  public heureDebut: Time | null;
  public heureFin: Time | null;
  public date: Date |null;
  public employes: Array<EmployeDto>;


  constructor() {
    this.id = null;
    this.code = '';
    this.title = '';
    this.objectif = '';
    this.heureDebut = null;
    this.heureFin = null;
    this.date = null;
    this.employes = new Array<EmployeDto>();
  }
}
