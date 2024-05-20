import { Injectable } from '@angular/core';
import {EtatCongeDto} from "../../../model/conge/etat-conge.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EtatCongeService {
  private _item: EtatCongeDto | undefined;
  private _items: Array<EtatCongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/etat-ca';

  constructor(private http : HttpClient) { }

  public findAll() {
    return this.http.get<Array<EtatCongeDto>>(this.url + "/all");
  }

  get item(): EtatCongeDto {
    if (this._item == null) {
      this._item = new EtatCongeDto();
    }
    return this._item;
  }

  set item(value: EtatCongeDto) {
    this._item = value;
  }

  get items(): Array<EtatCongeDto> {
    if (this._items == null) {
      this._items = new Array<EtatCongeDto>();
    }
    return this._items;
  }

  set items(value: Array<EtatCongeDto>) {
    this._items = value;
  }
}
