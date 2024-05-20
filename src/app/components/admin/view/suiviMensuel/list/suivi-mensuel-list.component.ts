import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {SuiviMensuelService} from "../../../../../shared/service/admin/suiviMensuel/suivi-mensuel.service";
import {SuiviMensuelDto} from "../../../../../shared/model/suivi/suivi-mensuel.model";
import {CommissionCreateComponent} from "../../employe/commission/create/commission-create.component";
import {CommissionEditComponent} from "../../employe/commission/edit/commission-edit.component";
import {CommissionViewComponent} from "../../employe/commission/view/commission-view.component";
import {SuiviMensuelCreateComponent} from "../create/suivi-mensuel-create.component";



@Component({
  selector: 'app-suiviMensuel-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    CommissionCreateComponent,
    CommissionEditComponent,
    CommissionViewComponent,
    SuiviMensuelCreateComponent,


  ],
  templateUrl: './suivi-mensuel-list.component.html',
  styleUrl: './suivi-mensuel-list.component.css'
})
export class SuiviMensuelListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: SuiviMensuelService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {

      this.items = data;
    });
  }

  get item(): SuiviMensuelDto {
    return this.service.item;
  }

  set item(value: SuiviMensuelDto) {
    this.service.item = value;
  }

  get items(): Array<SuiviMensuelDto> {
    return this.service.items;
  }

  set items(value: Array<SuiviMensuelDto>) {
    this.service.items = value;
  }

  showDialog(): void {
    this.item = new SuiviMensuelDto();
    this.createDialog = true;
  }
  public view(dto: SuiviMensuelDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: SuiviMensuelDto) {
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
