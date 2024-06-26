import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeCongeDto} from "../../../model/demande/demande-conge.model";
import {BehaviorSubject, Observable} from "rxjs";
import {formatDate} from "@angular/common";
import {DemandeAbsenceDto} from "../../../model/demande/demande-absence.model";

@Injectable({
  providedIn: 'root'
})
export class DemandeCongeUserService {

  private _item: DemandeCongeDto | undefined;
  private _items: Array<DemandeCongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/demandeConge';
  protected _editDialog: boolean = false;
  protected _viewDialog: boolean = false;
  protected _createDialog: boolean = false;

  constructor(private http: HttpClient) {
  }

  private matricule: string = "";

  public save(demande: DemandeCongeDto): Observable<DemandeCongeDto> {
    const demandeFormatted = {
      ...demande,
      dateDebut: demande.dateDebut ? formatDate(demande.dateDebut, 'yyyy-MM-dd\'T\'HH:mm:ss', 'en-US') : null,
      dateFin: demande.dateFin ? formatDate(demande.dateFin, 'yyyy-MM-dd\'T\'HH:mm:ss', 'en-US') : null
    };
    return this.http.post<DemandeCongeDto>(this.url + "/add", demandeFormatted);
  }



  public findAll() {
    return this.http.get<Array<DemandeCongeDto>>(this.url + "/all");
  }

  public findByCode(dto: DemandeCongeDto) {
    return this.http.get<DemandeCongeDto>(this.url + '/find/code/' + dto.code);
  }

  public deleteByCode(dto: DemandeCongeDto) {
    return this.http.delete<number>(this.url + '/delete/code/' + dto.code);
  }

  public update(demande: DemandeCongeDto): Observable<DemandeCongeDto> {
    const demandeFormatted = {
      ...demande,
      dateDebut: demande.dateDebut ? formatDate(demande.dateDebut, 'yyyy-MM-dd\'T\'HH:mm:ss', 'en-US') : null,
      dateFin: demande.dateFin ? formatDate(demande.dateFin, 'yyyy-MM-dd\'T\'HH:mm:ss', 'en-US') : null
    };
    return this.http.put<DemandeCongeDto>(this.url + '/update', demandeFormatted);
  }
  public findByEmployeMatricule(matricule: string) {
    return this.http.get<Array<DemandeCongeDto>>(this.url + '/find/employe/matricule/' + matricule);
  }
  public findDemandes() {
    this.matricule = localStorage.getItem('matricule') as string;
    this.findByEmployeMatricule(this.matricule).subscribe(data => {
      this.items = data;
      console.log(data)
    })
  }


  public findByTypeCongeCode(dto: DemandeCongeDto) {
    return this.http.get<Array<DemandeCongeDto>>(this.url + '/find/typeConge/code/' + dto.typeConge.code);
  }

  public findByEtatDemandeCode(dto: DemandeCongeDto) {
    return this.http.get<Array<DemandeCongeDto>>(this.url + '/find/etatDemande/code/' + dto.etatDemande.code);
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get item(): DemandeCongeDto {
    if (this._item == null) {
      this._item = new DemandeCongeDto();
    }
    return this._item;
  }

  set item(value: DemandeCongeDto) {
    this._item = value;
  }

  get items(): Array<DemandeCongeDto> {
    if (this._items == null) {
      this._items = new Array<DemandeCongeDto>();
    }
    return this._items;
  }

  set items(value: Array<DemandeCongeDto>) {
    this._items = value;
  }
}
