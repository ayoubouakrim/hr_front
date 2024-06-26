import { Injectable } from '@angular/core';
import {EmployeDto} from "../../../model/employe/employe.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeService{
  private _item: EmployeDto | undefined;
  private _items: Array<EmployeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/employe';

  protected _editDialog: boolean = false;
  protected _viewDialog: boolean = false;
  private _createDialog: boolean = false;


  constructor(private http: HttpClient) {

  }
  public save(): Observable<EmployeDto> {
    return this.http.post<EmployeDto>(this.url + "/add", this.item);
  }
  public findAll() {
    return this.http.get<Array<EmployeDto>>(this.url + "/all");
  }
  public findByMatricule(dto: EmployeDto) {
    return this.http.get<EmployeDto>(this.url + '/matricule/' + dto.matricule);
  }
  public findProfile(matricule: String) {
    return this.http.get<EmployeDto>(this.url + '/matricule/' + matricule);
  }
  public delete(dto: EmployeDto) {
    return this.http.delete<number>(this.url + '/matricule/' + dto.matricule);
  }
  public update(): Observable<EmployeDto> {
    return this.http.put<EmployeDto>(this.url + '/update', this.item);
  }
  public archiver(dto: EmployeDto): Observable<EmployeDto> {
    return this.http.put<EmployeDto>(this.url + '/update', dto);
  }
  public totalSalaire(): Observable<number>{
    return this.http.get<number>(this.url + '/total-salaire')
  }

  public findByUserUsername(username : string) {
    return this.http.get<EmployeDto>(this.url + '/username/' + username);
  }
  get item(): EmployeDto {
    if (this._item == null) {
      this._item = new EmployeDto();
    }
    return this._item;
  }

  set item(value: EmployeDto) {
    this._item = value;
  }

  get items(): Array<EmployeDto> {
    if (this._items == null) {
      this._items = new Array<EmployeDto>();
    }
    return this._items;
  }

  set items(value: Array<EmployeDto>) {
    this._items = value;
  }





  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
}
