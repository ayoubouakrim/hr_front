import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AbsenceAdminService} from "../../../../../../shared/service/admin/conge/absence-admin.service";
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";
import {AbsenceCreateComponent} from "../create/absence-create.component";
import {AbsenceViewComponent} from "../view/absence-view.component";
import {AbsenceEditComponent} from "../edit/absence-edit.component";



@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    AbsenceCreateComponent,
    AbsenceViewComponent,
    AbsenceEditComponent,

  ],
  templateUrl: './absence-list.component.html',
  styleUrl: './absence-list.component.css'
})
export class AbsenceListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: AbsenceAdminService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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

  showDialog(): void {
    this.item = new AbsenceDto();
    this.createDialog = true;
  }
  public view(dto: AbsenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: AbsenceDto) {
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

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
}
