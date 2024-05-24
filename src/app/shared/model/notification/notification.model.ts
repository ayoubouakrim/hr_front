import {NotificationEmployeDto} from "./notification-employe.model";

export class NotificationDto {

  public id: number | null;
  public code : String;
  public objectif: String;
  public message: String;
  public isChecked: boolean;
  public timeSend: Date | null;
  public timeExpiration: Date | null;
  public notificationEmployes: Array<NotificationEmployeDto>;


  constructor() {
    this.id = null;
    this.code = '';
    this.objectif = '';
    this.message = '';
    this.isChecked = false;
    this.timeSend = null;
    this.timeExpiration = null;
    this.notificationEmployes = new Array<NotificationEmployeDto>();
  }
}
