import { Injectable } from '@angular/core';
import {NotificationDto} from "../../../model/notification/notification.model";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NotificationUserService {
  private _item: NotificationDto | undefined;
  private _items: Array<NotificationDto> | undefined;

  private _notification: NotificationDto | undefined;
  private _notifications: Array<NotificationDto> | undefined;

  private url = 'http://localhost:8089/api/v1/user/notification';

  private _viewDialog: boolean = false;

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  constructor(private http: HttpClient) {

  }

  public findNotifications(matricule: String){
    return this.http.get<Array<NotificationDto>>(this.url + '/matricule/' + matricule);
  }

  public save(): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(this.url + "/add", this.item);
  }


  public updateChecked(dto :NotificationDto): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(this.url + "/update", dto);
  }
  public findByCode(dto: NotificationDto) {
    return this.http.get<NotificationDto>(this.url + '/code/' + dto.code);
  }

  public findByMatriculeAndCheked(matricule : string,checked : boolean){
    return this.http.get<Array<NotificationDto>>(this.url + "/matricule/"+matricule+"/checked/"+checked);
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


  get notification(): NotificationDto{
    if (this._notification == null) {
      this._notification = new NotificationDto();
    }
    return this._notification;
  }

  set notification(value: NotificationDto) {
    this._notification = value;
  }


  get notifications(): Array<NotificationDto> {
    if (this._notifications == null) {
      this._notifications = new Array<NotificationDto>();
    }
    return this._notifications;
  }

  set notifications(value: Array<NotificationDto>) {
    this._notifications = value;
  }
}
