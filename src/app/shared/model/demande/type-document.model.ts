export class TypeDocumentDto {
  public id : number | null;
  public code : string;
  public libelle : string;

  constructor() {
    this.id = null;
    this.code = "";
    this.libelle = "";
  }
}
