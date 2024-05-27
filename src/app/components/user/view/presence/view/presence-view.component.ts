import { Component } from '@angular/core';
import {PresenceUserService} from "../../../../../shared/service/user/presence/presence-user.service";
import {PresenceDto} from "../../../../../shared/model/presence/presence.model";
import {DatePipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-presence-view',
  standalone: true,
    imports: [
        DatePipe,
        DialogModule,
        PaginatorModule
    ],
  templateUrl: './presence-view.component.html',
  styleUrl: './presence-view.component.css'
})
export class PresenceViewComponent {
  constructor(private service: PresenceUserService) {
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



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
