import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommissionDto} from "../../../model/employe/commission.model";
import {EmployeDto} from "../../../model/employe/employe.model";

@Injectable({
  providedIn: 'root'
})
export class CommissionAdminService {

  private _item: CommissionDto | undefined;
  private _items: Array<CommissionDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/commission';

  private _editDialog: boolean = false;
  private _createDialog: boolean = false;
  private _viewDialog: boolean = false;

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }
  public save(): Observable<CommissionDto> {
    return this.http.post<CommissionDto>(this.url + "/add", this.item);
  }

  public update(): Observable<CommissionDto> {
    return this.http.put<CommissionDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<CommissionDto>>(this.url + "/all");
  }
  public delete(dto: CommissionDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: CommissionDto) {
    return this.http.get<CommissionDto>(this.url + '/code/' + dto.code);
  }
  public updatePar(dto: CommissionDto): Observable<EmployeDto> {
    return this.http.put<EmployeDto>(this.url + '/update', dto);
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
