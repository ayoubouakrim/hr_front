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
