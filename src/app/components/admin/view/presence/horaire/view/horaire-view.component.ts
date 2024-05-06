import { Component } from '@angular/core';
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-horaire-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './horaire-view.component.html',
  styleUrl: './horaire-view.component.css'
})
export class HoraireViewComponent {
  constructor(private service: HoraireAdminService) {
  }

  get item(): HoraireDto {
    return this.service.item;
  }

  set item(value: HoraireDto) {
    this.service.item = value;
  }

  get items(): Array<HoraireDto> {
    return this.service.items;
  }

  set items(value: Array<HoraireDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
