import { Injectable } from '@angular/core';
import {AbsenceDto} from "../../../model/conge/absence.model";
import {HttpClient} from "@angular/common/http";
import {CongeDto} from "../../../model/conge/conge.model";

@Injectable({
  providedIn: 'root'
})
export class AbsenceUserService {
  private _item: AbsenceDto | undefined;
  private _items: Array<AbsenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/absence';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {
  }

  public findByEmployeMatricule(){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<Array<AbsenceDto>>(this.url + '/employe/matricule/' + matricule);
  }
  public findByCode(dto: AbsenceDto) {
    return this.http.get<AbsenceDto>(this.url + '/code/' + dto.code);
  }
  get item(): AbsenceDto {
    if (this._item == null) {
      this._item = new AbsenceDto();
    }
    return this._item;
  }

  set item(value: AbsenceDto) {
    this._item = value;
  }

  get items(): Array<AbsenceDto> {
    if (this._items == null) {
      this._items = new Array<AbsenceDto>();
    }
    return this._items;
  }

  set items(value: Array<AbsenceDto>) {
    this._items = value;
  }
}
