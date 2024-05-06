import { Component } from '@angular/core';
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-horaire-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './horaire-edit.component.html',
  styleUrl: './horaire-edit.component.css'
})
export class HoraireEditComponent {
  constructor(private service: HoraireAdminService) {
  }


  public update(): void {
    this.service.update().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }

  hideCreateDialog() {
    this.editDialog = false;
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


  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }



}
