import { Component } from '@angular/core';
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import {CongeAdminService} from "../../../../../../shared/service/admin/conge/conge-admin.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-conge-view',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './conge-view-user.component.html',
  styleUrl: './conge-view-user.component.css'
})
export class CongeViewUserComponent {
  constructor(private service: CongeAdminService) {
  }

  get item(): CongeDto {
    return this.service.item;
  }

  set item(value: CongeDto) {
    this.service.item = value;
  }

  get items(): Array<CongeDto> {
    return this.service.items;
  }

  set items(value: Array<CongeDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
