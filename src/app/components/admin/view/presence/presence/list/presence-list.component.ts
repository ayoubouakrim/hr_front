import { Component } from '@angular/core';
import {PresenceAdminService} from "../../../../../../shared/service/admin/presence/presence-admin.service";
import {PresenceDto} from "../../../../../../shared/model/presence/presence.model";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-presence-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule
  ],
  templateUrl: './presence-list.component.html',
  styleUrl: './presence-list.component.css'
})
export class PresenceListComponent {
  constructor(private service: PresenceAdminService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  parseDate(dateArray: number[] | any): string {
    if(dateArray) {
      if (dateArray || Array.isArray(dateArray) || dateArray.length == 3) {
        const [hours = 0, minutes = 0, seconds = 0] = dateArray;
        const formattedHours = this.padWithZero(hours);
        const formattedMinutes = this.padWithZero(minutes);
        const formattedSeconds = this.padWithZero(seconds);
        const formattedDate = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        return formattedDate;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  padWithZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
  }

  get item(): PresenceDto {
    return this.service.item;
  }

  set item(value: PresenceDto) {
    this.service.item = value;
  }

  get items(): Array<PresenceDto> {
    return this.service.items;
  }

  set items(value: Array<PresenceDto>) {
    this.service.items = value;
  }

  showDialog(): void {
    this.createDialog = true;
  }

  public view(dto: PresenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: PresenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
