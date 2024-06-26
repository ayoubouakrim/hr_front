import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeCongeDto} from "../../../model/demande/demande-conge.model";
import {BehaviorSubject, Observable} from "rxjs";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DemandeCongeAdminService {

  private _item: DemandeCongeDto | undefined;
  private _items: Array<DemandeCongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/demandeConge';
  protected _editDialog: boolean = false;
  protected _viewDialog: boolean = false;

  constructor(private http: HttpClient) {
  }

  public save(demande : DemandeCongeDto): Observable<DemandeCongeDto> {
    return this.http.post<DemandeCongeDto>(this.url + "/add", demande);
  }
  public findAll() {
    return this.http.get<Array<DemandeCongeDto>>(this.url + "/all");
  }
  public findByCode(dto: DemandeCongeDto) {
    return this.http.get<DemandeCongeDto>(this.url + '/find/code/' + dto.code);
  }
  public delete(dto: DemandeCongeDto) {
    return this.http.delete<number>(this.url + '/delete/code/' + dto.code);
  }
  public update(demande : DemandeCongeDto): Observable<DemandeCongeDto> {
    return this.http.put<DemandeCongeDto>(this.url + '/update', demande);
  }
  public findByEmployeMatricule(dto: DemandeCongeDto) {
    return this.http.get<DemandeCongeDto>(this.url + '/find/employe/matricule/' + dto.employe.matricule);
  }

  public findByTypeCongeCode(dto: DemandeCongeDto) {
    return this.http.get<DemandeCongeDto>(this.url + '/find/typeConge/code/' + dto.typeConge.code);
  }
  public findByEtatDemandeCode(dto: DemandeCongeDto) {
    return this.http.get<DemandeCongeDto>(this.url + '/find/etatDemande/code/' + dto.etatDemande.code);
  }

  private _visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public visible$: Observable<boolean> = this._visibleSubject.asObservable();

  public showDialog(): void {
    this._visibleSubject.next(true);
  }

  public hideDialog(): void {
    this._visibleSubject.next(false);
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

  get item(): DemandeCongeDto {
    if(this._item == null){
      this._item=new DemandeCongeDto();
    }
    return this._item;
  }

  set item(value: DemandeCongeDto) {
    this._item = value;
  }

  get items(): Array<DemandeCongeDto>  {
    if(this._items == null){
      this._items=new Array<DemandeCongeDto>();
    }
    return this._items;
  }

  set items(value: Array<DemandeCongeDto>) {
    this._items = value;
  }
}
