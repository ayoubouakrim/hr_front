import { Injectable } from '@angular/core';
import {GenderDto} from "../../../model/employe/gender.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private _item: GenderDto | undefined;
  private _items: Array<GenderDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/gender';
  constructor(private http: HttpClient) {

  }
  public save(): Observable<GenderDto> {
    return this.http.post<GenderDto>(this.url + "/add", this.item);
  }
  public findAll() {
    return this.http.get<Array<GenderDto>>(this.url + "/all");
  }
  public delete(dto: GenderDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  get item(): GenderDto {
    if (this._item == null) {
      this._item = new GenderDto();
    }
    return this._item;
  }

  set item(value: GenderDto) {
    this._item = value;
  }

  get items(): Array<GenderDto> {
    if (this._items == null) {
      this._items = new Array<GenderDto>();
    }
    return this._items;
  }

  set items(value: Array<GenderDto>) {
    this._items = value;
  }


}
