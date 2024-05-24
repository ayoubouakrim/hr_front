import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DepartementService} from "../../../../../shared/service/admin/departement/departement.service";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";
import {DepartementCreateComponent} from "../create/departement-create.component";
import {DepartementViewComponent} from "../view/departement-view.component";
import {DepartementEditComponent} from "../edit/departement-edit.component";
import {HoraireDto} from "../../../../../shared/model/presence/horaire.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-departement-list',
  standalone: true,
    imports: [
        ButtonModule,
        SharedModule,
        TableModule,
        DepartementCreateComponent,
        DepartementViewComponent,
        DepartementEditComponent,
        DatePipe
    ],
  templateUrl: './departement-list.component.html',
  styleUrl: './departement-list.component.css'
})
export class DepartementListComponent implements OnInit{

  constructor(private service: DepartementService) {
  }

  ngOnInit(): void {
    this.findAll();
  }


  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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

  showDialog(): void {
    this.createDialog = true;
  }

  public view(dto: DepartementDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: DepartementDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }
  public  delete(dto: DepartementDto) {
    this.service.delete(dto).subscribe(status => {
      if (status > 0) {
        const position = this.items.indexOf(dto);
        position > -1 ? this.items.splice(position, 1) : false;

      }

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
