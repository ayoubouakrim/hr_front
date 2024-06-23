import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

import {PasswordEmailChange} from "../model/password-email-change.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _item: User | undefined;
  private _items: Array<User> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/user';


  private _createDialog: boolean = false;
  private _editDialog: boolean = false;


  constructor(private http: HttpClient) {

  }

  public findByUsername(username : string) {
    return this.http.get<User>(this.url + "/username/" + username);
  }
  public save(): Observable<User> {
    return this.http.post<User>(this.url + "/save", this.item);
  }
  public update(): Observable<User> {
    return this.http.put<User>(this.url + "/update", this.item);
  }
  public updatePasswordAndEmail(item : PasswordEmailChange) {
    return this.http.put(this.url + "/update", item);
  }
  public findAll() {
    return this.http.get<Array<User>>(this.url );
  }

  public updatePassword(passwordAndEmailChange : PasswordEmailChange){
    return this.http.put(this.url + "/password/update", passwordAndEmailChange);
  }

  get item(): User {
    if (this._item == null) {
      this._item = new User();
    }
    return this._item;
  }

  set item(value: User) {
    this._item = value;
  }

  get items(): Array<User> {
    if (this._items == null) {
      this._items = new Array<User>();
    }
    return this._items;
  }

  set items(value: Array<User>) {
    this._items = value;
  }

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
}
