import {NotificationDto} from "./notification.model";
import {EmployeDto} from "../employe/employe.model";

export class NotificationEmployeDto {
  public id: number | null;
  public notification: NotificationDto;
  public employe: EmployeDto;

  constructor() {
    this.id = null;
    this.notification = new NotificationDto();
    this.employe = new EmployeDto();
  }
}
