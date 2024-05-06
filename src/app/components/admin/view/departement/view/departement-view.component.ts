import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartementService} from "../../../../../shared/service/admin/departement/departement.service";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";

@Component({
  selector: 'app-departement-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './departement-view.component.html',
  styleUrl: './departement-view.component.css'
})
export class DepartementViewComponent {

  constructor(private service: DepartementService) {
  }

  get item(): DepartementDto {
    return this.service.item;
  }

  set item(value: DepartementDto) {
    this.service.item = value;
  }

  get items(): Array<DepartementDto> {
    return this.service.items;
  }

  set items(value: Array<DepartementDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
