export class EtatCongeDto {
  public id: number | null;
  public code: String;
  public libelle: String;

  constructor() {
    this.id = null;
    this.code = '';
    this.libelle = '';
  }
}
