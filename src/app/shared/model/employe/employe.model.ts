import {GenderDto} from "./gender.model";
import {PostDto} from "./post.model";
import {DepartementDto} from "../departement/departement.model";
import {HoraireDto} from "../presence/horaire.model";



export class EmployeDto {
  public id: number | null;
  public  matricule: String;
  public  cin: String;
  public  nom: String;
  public  prenom: String;
  public gender: GenderDto;
  public  adresse: String;
  public  telephone: String;
  public salaire: number | null;
  public dateEmbauche: Date | null;
  public archive: boolean | null;
  public postDto: PostDto;
  public departementDto: DepartementDto;
  public imagePath: String;
  public horaire: HoraireDto



  constructor() {

    this.id = null;
    this.matricule = '';
    this.cin = '';
    this.nom = '';
    this.prenom = '';
    this.gender = new GenderDto();
    this.adresse = '';
    this.telephone = '';
    this.salaire = null;
    this.dateEmbauche = null;
    this.archive = null;
    this.postDto = new PostDto();
    this.departementDto = new DepartementDto();
    this.imagePath = '';
    this.horaire = new HoraireDto();



  }
}
