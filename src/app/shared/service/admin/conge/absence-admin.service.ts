import { Injectable } from '@angular/core';
import {AbsenceDto} from "../../../model/conge/absence.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CongeDto} from "../../../model/conge/conge.model";

@Injectable({
  providedIn: 'root'
})
export class AbsenceAdminService {
  private _item: AbsenceDto | undefined;
  private _items: Array<AbsenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/absence';

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
  public save(): Observable<AbsenceDto> {
    return this.http.post<AbsenceDto>(this.url + "/add", this.item);
  }

  public update(): Observable<AbsenceDto> {
    return this.http.put<AbsenceDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<AbsenceDto>>(this.url + "/all");
  }
  public delete(dto: CongeDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
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
