import {Injectable} from '@angular/core';
import {DemandeAbsenceDto} from "../../../model/demande/demande-absence.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceUserService {

  private _item: DemandeAbsenceDto | undefined;
  private _items: Array<DemandeAbsenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/DemandeAbsence';
  protected _editDialog: boolean = false;
  protected _viewDialog: boolean = false;
  protected _createDialog: boolean = false;
  private matricule : string = "";

  constructor(private http: HttpClient) {
  }

  public save(demande: DemandeAbsenceDto): Observable<DemandeAbsenceDto> {
    return this.http.post<DemandeAbsenceDto>(this.url + "/add", demande);
  }

  public findAll() {
    return this.http.get<Array<DemandeAbsenceDto>>(this.url + "/all");
  }

  public findByCode(dto: DemandeAbsenceDto) {
    return this.http.get<DemandeAbsenceDto>(this.url + '/find/code/' + dto.code);
  }

  public deleteByCode(dto: DemandeAbsenceDto) {
    return this.http.delete<string>(this.url + '/delete/code/' + dto.code);
  }

  public update(demande: DemandeAbsenceDto): Observable<DemandeAbsenceDto> {
    return this.http.put<DemandeAbsenceDto>(this.url + '/update', demande);
  }

  public findByEmployeMatricule(matricule: string) {
    return this.http.get<Array<DemandeAbsenceDto>>(this.url + '/find/employe/matricule/' + matricule);
  }

  public findByTypeAbsenceCode(dto: DemandeAbsenceDto) {
    return this.http.get<Array<DemandeAbsenceDto>>(this.url + '/find/typeAbsence/code/' + dto.typeAbsence.code);
  }

  public findByEtatDemandeCode(dto: DemandeAbsenceDto) {
    return this.http.get<Array<DemandeAbsenceDto>>(this.url + '/find/etatDemande/code/' + dto.etatDemande.code);
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
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

  get item(): DemandeAbsenceDto {
    if (this._item == null) {
      this._item = new DemandeAbsenceDto();
    }
    return this._item;
  }

  set item(value: DemandeAbsenceDto) {
    this._item = value;
  }

  get items(): Array<DemandeAbsenceDto> {
    if (this._items == null) {
      this._items = new Array<DemandeAbsenceDto>();
    }
    return this._items;
  }

  set items(value: Array<DemandeAbsenceDto>) {
    this._items = value;
  }

  public findDemandes() {
    this.matricule = localStorage.getItem('matricule') as string;
    this.findByEmployeMatricule(this.matricule).subscribe(data => {
      this.items = data;
      console.log(data)
    })
  }
}
