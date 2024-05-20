import { Injectable } from '@angular/core';
import {HoraireDto} from "../../../model/presence/horaire.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HoraireAdminService {
  private _item: HoraireDto | undefined;
  private _items: Array<HoraireDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/horaire';

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
  public save(): Observable<HoraireDto> {
    return this.http.post<HoraireDto>(this.url + "/add", this.item);
  }

  public update(): Observable<HoraireDto> {
    return this.http.put<HoraireDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<HoraireDto>>(this.url + "/all");
  }
  public delete(dto: HoraireDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: HoraireDto) {
    return this.http.get<HoraireDto>(this.url + '/code/' + dto.code);
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
