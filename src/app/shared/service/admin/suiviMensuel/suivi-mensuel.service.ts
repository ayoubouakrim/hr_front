import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SuiviMensuelDto} from "../../../model/suivi/suivi-mensuel.model";

@Injectable({
  providedIn: 'root'
})
export class SuiviMensuelService {
  private _item: SuiviMensuelDto | undefined;
  private _items: Array<SuiviMensuelDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/suivi-mensuel';

  private _editDialog: boolean = false;
  private _createDialog: boolean = false;
  private _viewDialog: boolean = false;

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }
  public save(): Observable<SuiviMensuelDto> {
    return this.http.post<SuiviMensuelDto>(this.url + "/add", this.item);
  }

  public update(): Observable<SuiviMensuelDto> {
    return this.http.put<SuiviMensuelDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<SuiviMensuelDto>>(this.url + "/all");
  }
  public findByEmploye(annee: number , mois: number , matricule: String) {
    return this.http.get<SuiviMensuelDto>(this.url + '/annee/' + annee + '/mois/' + mois + '/employe/matricule/' + matricule);
}
  public delete(dto: SuiviMensuelDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: SuiviMensuelDto) {
    return this.http.get<SuiviMensuelDto>(this.url + '/code/' + dto.code);
  }
  get item(): SuiviMensuelDto {
    if (this._item == null) {
      this._item = new SuiviMensuelDto();
    }
    return this._item;
  }

  set item(value: SuiviMensuelDto) {
    this._item = value;
  }

  get items(): Array<SuiviMensuelDto> {
    if (this._items == null) {
      this._items = new Array<SuiviMensuelDto>();
    }
    return this._items;
  }

  set items(value: Array<SuiviMensuelDto>) {
    this._items = value;
  }
}
