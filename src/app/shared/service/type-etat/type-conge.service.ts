import { Injectable } from '@angular/core';
import {TypeCongeDto} from "../../model/conge/type-conge.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TypeCongeService {
  private _item: TypeCongeDto | undefined;
  private _items: Array<TypeCongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/type-conge';

  constructor(private http : HttpClient) { }

  public findAll() {
    return this.http.get<Array<TypeCongeDto>>(this.url + "/all");
  }

  get item(): TypeCongeDto {
    if (this._item == null) {
      this._item = new TypeCongeDto();
    }
    return this._item;
  }

  set item(value: TypeCongeDto) {
    this._item = value;
  }

  get items(): Array<TypeCongeDto> {
    if (this._items == null) {
      this._items = new Array<TypeCongeDto>();
    }
    return this._items;
  }

  set items(value: Array<TypeCongeDto>) {
    this._items = value;
  }
}
