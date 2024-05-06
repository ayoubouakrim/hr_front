import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {EmployeCreateComponent} from "../create/employe-create.component";
import {EmployeViewComponent} from "../view/employe-view.component";
import {EmployeEditComponent} from "../edit/employe-edit.component";

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    EmployeCreateComponent,
    EmployeViewComponent,
    EmployeEditComponent
  ],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: EmployeService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
  }

  get item(): EmployeDto {
    return this.service.item;
  }

  set item(value: EmployeDto) {
    this.service.item = value;
  }

  get items(): Array<EmployeDto> {
    return this.service.items;
  }

  set items(value: Array<EmployeDto>) {
    this.service.items = value;
  }

  showDialog(): void {
    this.service.showDialog();
  }

  public view(dto: EmployeDto) {
    this.service.findByMatricule(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: EmployeDto) {
    this.service.findByMatricule(dto).subscribe(res => {
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

}
