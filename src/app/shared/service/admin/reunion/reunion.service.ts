import { Injectable } from '@angular/core';
import {ReunionDto} from "../../../model/reunion/reunion.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  private _item: ReunionDto | undefined;
  private _items: Array<ReunionDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/reunion';

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
  public save(): Observable<ReunionDto> {
    return this.http.post<ReunionDto>(this.url + "/add", this.item);
  }

  public update(): Observable<ReunionDto> {
    return this.http.put<ReunionDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<ReunionDto>>(this.url + "/all");
  }
  public delete(dto: ReunionDto) {
    return this.http.delete<number>(this.url + '/delete/code/' + dto.code);
  }
  public findByCode(code: String) {
    return this.http.get<ReunionDto>(this.url + '/code/' + code);
  }

  public findByItemCode(dto: ReunionDto) {
    return this.http.get<ReunionDto>(this.url + '/code/' + dto.code);
  }
  get item(): ReunionDto {
    if (this._item == null) {
      this._item = new ReunionDto();
    }
    return this._item;
  }

  set item(value: ReunionDto) {
    this._item = value;
  }

  get items(): Array<ReunionDto> {
    if (this._items == null) {
      this._items = new Array<ReunionDto>();
    }
    return this._items;
  }

  set items(value: Array<ReunionDto>) {
    this._items = value;
  }
}
