import { Injectable } from '@angular/core';
import {CongeDto} from "../../../model/conge/conge.model";
import {HttpClient} from "@angular/common/http";
import {AbsenceDto} from "../../../model/conge/absence.model";

@Injectable({
  providedIn: 'root'
})
export class CongeUserService {
  private _item: CongeDto | undefined;
  private _items: Array<CongeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/conge';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }

  public findByEmployeMatricule(){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<Array<AbsenceDto>>(this.url + '/employe/matricule/' + matricule);
  }

  public findByCode(dto: CongeDto) {
    return this.http.get<CongeDto>(this.url + '/code/' + dto.code);
  }

  public caculeCongeDispo(){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<number>(this.url + '/calcule/matricule/' + matricule);
  }

  get item(): CongeDto {
    if (this._item == null) {
      this._item = new CongeDto();
    }
    return this._item;
  }

  set item(value: CongeDto) {
    this._item = value;
  }

  get items(): Array<CongeDto> {
    if (this._items == null) {
      this._items = new Array<CongeDto>();
    }
    return this._items;
  }

  set items(value: Array<CongeDto>) {
    this._items = value;
  }
}
