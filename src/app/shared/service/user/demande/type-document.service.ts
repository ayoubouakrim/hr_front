import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TypeDocumentDto} from "../../../model/demande/type-document.model";

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {
  private _item: TypeDocumentDto | undefined;
  private _items: Array<TypeDocumentDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/typeDocument';
  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get<Array<TypeDocumentDto>>(this.url + "/all");
  }
  public findByCode(dto: TypeDocumentDto) {
    return this.http.get<TypeDocumentDto>(this.url + '/find/code/' + dto.code);
  }


  get item(): TypeDocumentDto {
    if(this._item == null){
      this._item = new TypeDocumentDto();
    }
    return this._item;
  }

  set item(value: TypeDocumentDto) {
    this._item = value;
  }

  get items(): Array<TypeDocumentDto>  {
    if(this._items == null){
      this._items = new Array<TypeDocumentDto>();
    }
    return this._items;
  }

  set items(value: Array<TypeDocumentDto> ) {
    this._items = value;
  }
}
