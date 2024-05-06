import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CongeAdminService} from "../../../../../../shared/service/admin/conge/conge-admin.service";
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import {CongeCreateComponent} from "../create/conge-create.component";
import {CongeViewComponent} from "../view/conge-view.component";
import {CongeEditComponent} from "../edit/conge-edit.component";
import {AbsenceCreateComponent} from "../../absence/create/absence-create.component";
import {AbsenceEditComponent} from "../../absence/edit/absence-edit.component";
import {AbsenceViewComponent} from "../../absence/view/absence-view.component";



@Component({
  selector: 'app-conge-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    CongeCreateComponent,
    CongeViewComponent,
    CongeEditComponent,
    AbsenceCreateComponent,
    AbsenceEditComponent,
    AbsenceViewComponent,

  ],
  templateUrl: './conge-list.component.html',
  styleUrl: './conge-list.component.css'
})
export class CongeListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: CongeAdminService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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

  showDialog(): void {
    this.item = new CongeDto();
    this.createDialog = true;
  }
  public view(dto: CongeDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: CongeDto) {
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
