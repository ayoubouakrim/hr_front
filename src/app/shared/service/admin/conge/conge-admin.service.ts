import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CongeDto} from "../../../model/conge/conge.model";

@Injectable({
  providedIn: 'root'
})
export class CongeAdminService {

  private _item: CongeDto | undefined;
  private _items: Array<CongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/conge';

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
  public save(): Observable<CongeDto> {
    return this.http.post<CongeDto>(this.url + "/add", this.item);
  }

  public update(): Observable<CongeDto> {
    return this.http.put<CongeDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<CongeDto>>(this.url + "/all");
  }
  public delete(dto: CongeDto) {
    return this.http.delete<number>(this.url + '/id/' + dto.id);
  }
  public findByCode(dto: CongeDto) {
    return this.http.get<CongeDto>(this.url + '/code/' + dto.code);
  }
  get item(): CongeDto {
    if (this._item == null) {
      this._item = new CongeDto();
    }
    return this._item;
  }

  set item(value: CongeDto) {
    this._item = value;
  }

  get items(): Array<CongeDto> {
    if (this._items == null) {
      this._items = new Array<CongeDto>();
    }
    return this._items;
  }

  set items(value: Array<CongeDto>) {
    this._items = value;
  }
}
