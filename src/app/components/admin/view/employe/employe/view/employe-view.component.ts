import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {PostDto} from "../../../../../../shared/model/employe/post.model";
import {GenderDto} from "../../../../../../shared/model/employe/gender.model";
import {DepartementDto} from "../../../../../../shared/model/departement/departement.model";
import {GenderService} from "../../../../../../shared/service/admin/employe/gender.service";
import {PostService} from "../../../../../../shared/service/admin/employe/post.service";
import {DepartementService} from "../../../../../../shared/service/admin/departement/departement.service";

@Component({
  selector: 'app-employe-view',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        PaginatorModule,
        SharedModule
    ],
  templateUrl: './employe-view.component.html',
  styleUrl: './employe-view.component.css'
})
export class EmployeViewComponent {

  constructor(private service : EmployeService, private genderService: GenderService, private postService: PostService, private departementService: DepartementService) {
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
  get post(): PostDto {
    return this.postService.item;
  }
  set post(value: PostDto) {
    this.postService.item = value;
  }
  get posts(): Array<PostDto> {
    return this.postService.items;
  }
  set posts(value: Array<PostDto>) {
    this.postService.items = value;
  }

  get gender(): GenderDto {
    return this.genderService.item;
  }
  set gender(value: GenderDto) {
    this.genderService.item = value;
  }
  get genders(): Array<GenderDto> {
    return this.genderService.items;
  }
  set genders(value: Array<GenderDto>) {
    this.genderService.items = value;
  }
  get departement(): DepartementDto {
    return this.departementService.item;
  }
  set departement(value: DepartementDto) {
    this.departementService.item = value;
  }
  get departements(): Array<DepartementDto> {
    return this.departementService.items;
  }
  set departements(value: Array<DepartementDto>) {
    this.departementService.items = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
