import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeDto} from "../../../model/employe/employe.model";
import {NotificationDto} from "../../../model/notification/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationAdminService {


  private _item: NotificationDto | undefined;
  private _items: Array<NotificationDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/notification';

  private _editDialog: boolean = false;
  private _createDialog: boolean = false;
  private _viewDialog: boolean = false;
  private _extractedEmployees: EmployeDto[] = [];


  get extractedEmployees(): EmployeDto[] {
    return this._extractedEmployees;
  }

  set extractedEmployees(value: EmployeDto[]) {
    this._extractedEmployees = value;
  }
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
  public save(): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(this.url + "/add", this.item);
  }

  public update(): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(this.url + "/update", this.item);
  }
  public findAll() {
    return this.http.get<Array<NotificationDto>>(this.url + "/all");
  }
  public delete(dto: NotificationDto) {
    return this.http.delete<number>(this.url + '/code/' + dto.code);
  }
  public findByCode(dto: NotificationDto) {
    return this.http.get<NotificationDto>(this.url + '/code/' + dto.code);
  }
  public updatePar(dto: NotificationDto): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(this.url + '/update', dto);
  }
  public findNotifications(matricule: String){
    return this.http.get<Array<NotificationDto>>(this.url + '/matricule/' + matricule);
  }
  get item(): NotificationDto {
    if (this._item == null) {
      this._item = new NotificationDto();
    }
    return this._item;
  }

  set item(value: NotificationDto) {
    this._item = value;
  }

  get items(): Array<NotificationDto> {
    if (this._items == null) {
      this._items = new Array<NotificationDto>();
    }
    return this._items;
  }

  set items(value: Array<NotificationDto>) {
    this._items = value;
  }
}
