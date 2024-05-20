import {DemandeDto} from "./demande.model";
import {TypeAbsenceDto} from "../conge/type-absence.model";

export class DemandeAbsenceDto extends DemandeDto{
  public dateDebut : Date | null;
  public dateFin : Date | null;
  typeAbsence : TypeAbsenceDto;

  constructor() {
    super();
    this.dateDebut = null;
    this.dateFin = null;
    this.typeAbsence = new TypeAbsenceDto();
  }
}
