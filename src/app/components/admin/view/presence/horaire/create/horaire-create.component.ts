import { Component } from '@angular/core';
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-horaire-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './horaire-create.component.html',
  styleUrl: './horaire-create.component.css'
})
export class HoraireCreateComponent {
  constructor(private service: HoraireAdminService) {

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
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

  hideCreateDialog() {
    this.createDialog = false;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

}
