import { Injectable } from '@angular/core';
import {DepartementDto} from "../../../model/departement/departement.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class Departement_userService {
  private _item: DepartementDto | undefined;
  private _items: Array<DepartementDto> | undefined;
  private url = 'http://localhost:8037/api/v1/admin/departement';

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
  public save(): Observable<DepartementDto> {
    return this.http.post<DepartementDto>(this.url + "/add", this.item);
  }

  public update(): Observable<DepartementDto> {
    return this.http.put<DepartementDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<DepartementDto>>(this.url + "/all");
  }
  public delete(dto: DepartementDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: DepartementDto) {
    return this.http.get<DepartementDto>(this.url + '/code/' + dto.code);
  }
  get item(): DepartementDto {
    if (this._item == null) {
      this._item = new DepartementDto();
    }
    return this._item;
  }

  set item(value: DepartementDto) {
    this._item = value;
  }

  get items(): Array<DepartementDto> {
    if (this._items == null) {
      this._items = new Array<DepartementDto>();
    }
    return this._items;
  }

  set items(value: Array<DepartementDto>) {
    this._items = value;
  }


}
