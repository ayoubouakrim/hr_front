import {DemandeDto} from "./demande.model";
import {TypeCongeDto} from "../conge/type-conge.model";

export class DemandeCongeDto extends DemandeDto{
  public dateDebut : Date | null;
  public dateFin : Date | null;
  public typeConge : TypeCongeDto;
  constructor() {
    super();
    this.dateDebut = null;
    this.dateFin = null;
    this.typeConge = new TypeCongeDto();
  }
}
