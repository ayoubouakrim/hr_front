import { Injectable } from '@angular/core';
import {TypeAbsenceDto} from "../../../model/conge/type-absence.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TypeAbsenceAdminService {
  private _item: TypeAbsenceDto | undefined;
  private _items: Array<TypeAbsenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/type-absence';

  constructor(private http : HttpClient) { }

  public findAll() {
    return this.http.get<Array<TypeAbsenceDto>>(this.url + "/all");
  }

  get item(): TypeAbsenceDto {
    if (this._item == null) {
      this._item = new TypeAbsenceDto();
    }
    return this._item;
  }

  set item(value: TypeAbsenceDto) {
    this._item = value;
  }

  get items(): Array<TypeAbsenceDto> {
    if (this._items == null) {
      this._items = new Array<TypeAbsenceDto>();
    }
    return this._items;
  }

  set items(value: Array<TypeAbsenceDto>) {
    this._items = value;
  }
}
