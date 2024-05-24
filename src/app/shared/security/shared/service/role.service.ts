import { Injectable } from '@angular/core';
import {Role} from "../model/role.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _item: Role | undefined;
  private _items: Array<Role> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/role/';


  private _createDialog: boolean = false;


  constructor(private http: HttpClient) {

  }
  public save(): Observable<Role> {
    return this.http.post<Role>(this.url + "/save", this.item);
  }
  public findAll() {
    return this.http.get<Array<Role>>(this.url);
  }

  get item(): Role {
    if (this._item == null) {
      this._item = new Role();
    }
    return this._item;
  }

  set item(value: Role) {
    this._item = value;
  }

  get items(): Array<Role> {
    if (this._items == null) {
      this._items = new Array<Role>();
    }
    return this._items;
  }

  set items(value: Array<Role>) {
    this._items = value;
  }






  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
}
