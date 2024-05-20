import { Component } from '@angular/core';
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {ButtonModule} from "primeng/button";
import {CongeCreateComponent} from "../../../conge/conge/create/conge-create.component";
import {CongeEditComponent} from "../../../conge/conge/edit/conge-edit.component";
import {CongeViewComponent} from "../../../conge/conge/view/conge-view.component";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {HoraireCreateComponent} from "../create/horaire-create.component";
import {HoraireViewComponent} from "../view/horaire-view.component";
import {HoraireEditComponent} from "../edit/horaire-edit.component";
import {DepartementDto} from "../../../../../../shared/model/departement/departement.model";

@Component({
  selector: 'app-horaire-list',
  standalone: true,
  imports: [
    ButtonModule,
    CongeCreateComponent,
    CongeEditComponent,
    CongeViewComponent,
    SharedModule,
    TableModule,
    HoraireCreateComponent,
    HoraireViewComponent,
    HoraireEditComponent
  ],
  templateUrl: './horaire-list.component.html',
  styleUrl: './horaire-list.component.css'
})
export class HoraireListComponent {
  constructor(private service: HoraireAdminService) {
  }

  ngOnInit(): void {
    this.findAll();
  }


  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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

  showDialog(): void {
    this.createDialog = true;
  }

  public view(dto: HoraireDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: HoraireDto) {
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
