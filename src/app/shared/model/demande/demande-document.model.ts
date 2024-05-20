import {DemandeDto} from "./demande.model";
import {TypeDocumentDto} from "./type-document.model";

export class DemandeDocumentDto extends DemandeDto{
  public typeDocument : TypeDocumentDto;

  constructor() {
    super();
    this.typeDocument = new TypeDocumentDto();
  }
}
