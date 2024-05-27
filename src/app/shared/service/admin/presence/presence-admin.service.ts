import { Injectable } from '@angular/core';
import {PresenceDto} from "../../../model/presence/presence.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceAdminService {
  private _item: PresenceDto | undefined;
  private _items: Array<PresenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/presence';

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
  public save(): Observable<PresenceDto> {
    return this.http.post<PresenceDto>(this.url + "/add", this.item);
  }

  public update(): Observable<PresenceDto> {
    return this.http.put<PresenceDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<PresenceDto>>(this.url + "/all");
  }
  public delete(dto: PresenceDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: PresenceDto) {
    return this.http.get<PresenceDto>(this.url + '/code/' + dto.code);
  }
  get item(): PresenceDto {
    if (this._item == null) {
      this._item = new PresenceDto();
    }
    return this._item;
  }

  set item(value: PresenceDto) {
    this._item = value;
  }

  get items(): Array<PresenceDto> {
    if (this._items == null) {
      this._items = new Array<PresenceDto>();
    }
    return this._items;
  }

  set items(value: Array<PresenceDto>) {
    this._items = value;
  }
}
