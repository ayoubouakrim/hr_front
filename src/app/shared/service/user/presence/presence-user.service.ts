import { Injectable } from '@angular/core';
import {PresenceDto} from "../../../model/presence/presence.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceUserService {
  private _item: PresenceDto | undefined;
  private _items: Array<PresenceDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/presence';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }

  public save(): Observable<PresenceDto> {
    return this.http.post<PresenceDto>(this.url + "/add", this.item);
  }

  public update(): Observable<PresenceDto> {
    return this.http.put<PresenceDto>(this.url + "/update", this.item);
  }

  public findById(dto: PresenceDto) {
    return this.http.get<PresenceDto>(this.url + '/find/id/' + dto.id);
  }

  public findByEmployeMatriculeAndDatee( matricule : string, datee : string){
    return this.http.get<PresenceDto>(this.url + '/matricule/' + matricule +'/date/'+ datee);
  }

  public findByEmployeMatricule(){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<Array<PresenceDto>>(this.url + '/employe/matricule/' + matricule);
  }

  get item(): PresenceDto {
    if (this._item == null) {
      this._item = new PresenceDto();
    }
    return this._item;
  }

  set item(value: PresenceDto) {
    this._item = value;
  }

  get items(): Array<PresenceDto> {
    if (this._items == null) {
      this._items = new Array<PresenceDto>();
    }
    return this._items;
  }

  set items(value: Array<PresenceDto>) {
    this._items = value;
  }
}
