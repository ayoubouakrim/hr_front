import { Component } from '@angular/core';
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";
import {AbsenceAdminService} from "../../../../../../shared/service/admin/conge/absence-admin.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-absence-view',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './absence-view.component.html',
  styleUrl: './absence-view.component.css'
})
export class AbsenceViewComponent {
  constructor(private service: AbsenceAdminService) {
  }

  get item(): AbsenceDto {
    return this.service.item;
  }

  set item(value: AbsenceDto) {
    this.service.item = value;
  }

  get items(): Array<AbsenceDto> {
    return this.service.items;
  }

  set items(value: Array<AbsenceDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
