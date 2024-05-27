import { Injectable } from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {PasswordEmailChange} from "../model/password-email-change.model";

@Injectable({
  providedIn: 'root'
})
export class UserUserService {
  private _item: PasswordEmailChange | undefined;
  private _items: Array<PasswordEmailChange> | undefined;
  private url = 'http://localhost:8089/api/v1/user/user';


  protected _editDialog: boolean = false;


  constructor(private http: HttpClient) {
  }

  public updatePasswordAndEmail() {
    return this.http.put(this.url + "/update", this.item);
}

public updatePassword(passwordAndEmailChange : PasswordEmailChange){
  return this.http.put(this.url + "/password/update", passwordAndEmailChange);
}

public findByUsername(username : string) {
return this.http.get<User>(this.url + "/username/" + username);
}


  get item(): PasswordEmailChange {
    if(this._item == null){
      this._item = new PasswordEmailChange();
    }
    return this._item;
  }

  set item(value: PasswordEmailChange) {
    this._item = value;
  }

  get items(): Array<PasswordEmailChange> {
    if(this._items == null){
      this._items = new Array<PasswordEmailChange>();
    }
    return this._items;
  }

  set items(value: Array<PasswordEmailChange>) {
    this._items = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
}
