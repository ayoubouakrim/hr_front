import {Time} from "@angular/common";

export class HoraireDto {

  public id: number | null;
  public code: String;
  public debut: Time| null;
  public fin: Time | null;
  public pause: String ;


  constructor() {
    this.id = null;
    this.code = '';
    this.debut = null;
    this.fin = null;
    this.pause = '';
  }
}
