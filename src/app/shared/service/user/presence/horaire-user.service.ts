import { Injectable } from '@angular/core';
import {HoraireDto} from "../../../model/presence/horaire.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AbsenceDto} from "../../../model/conge/absence.model";

@Injectable({
  providedIn: 'root'
})
export class HoraireUserService {
  private _item: HoraireDto | undefined;
  private _items: Array<HoraireDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/horaire';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }

  public findByCode(dto: HoraireDto) {
    return this.http.get<HoraireDto>(this.url + '/code/' + dto.code);
  }

  public findByEmployeMatricule(){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<Array<HoraireDto>>(this.url + '/employe/matricule/' + matricule);
  }
  get item(): HoraireDto {
    if (this._item == null) {
      this._item = new HoraireDto();
    }
    return this._item;
  }

  set item(value: HoraireDto) {
    this._item = value;
  }

  get items(): Array<HoraireDto> {
    if (this._items == null) {
      this._items = new Array<HoraireDto>();
    }
    return this._items;
  }

  set items(value: Array<HoraireDto>) {
    this._items = value;
  }
}
