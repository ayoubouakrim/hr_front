import {EmployeDto} from "../employe/employe.model";
import {EtatDemandeDto} from "./etat-demande.model";

export class DemandeDto {

  public id : number | null;
  public code : string;
  public raison : string;
  public etatDemande : EtatDemandeDto;
  employe : EmployeDto;

  constructor() {

    this.id = null;
    this.code = "";
    this.raison = '';
    this.etatDemande = new EtatDemandeDto();
    this.employe = new EmployeDto();
  }
}
