import { Injectable } from '@angular/core';
import {CommissionDto} from "../../../model/employe/commission.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommissionUserService {
  private _item: CommissionDto | undefined;
  private _items: Array<CommissionDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/commission';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }

  public findByEmployeMatricule(matricule : string){
    return this.http.get<Array<CommissionDto>>(this.url + '/employe/matricule/' + matricule);
  }

  public findByCode(dto: CommissionDto) {
    return this.http.get<CommissionDto>(this.url + '/code/' + dto.code);
  }

  get item(): CommissionDto {
    if (this._item == null) {
      this._item = new CommissionDto();
    }
    return this._item;
  }

  set item(value: CommissionDto) {
    this._item = value;
  }

  get items(): Array<CommissionDto> {
    if (this._items == null) {
      this._items = new Array<CommissionDto>();
    }
    return this._items;
  }

  set items(value: Array<CommissionDto>) {
    this._items = value;
  }
}
