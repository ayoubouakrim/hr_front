import {Component, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {FormsModule} from "@angular/forms";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {GenderService} from "../../../../../../shared/service/admin/employe/gender.service";
import {PostService} from "../../../../../../shared/service/admin/employe/post.service";
import {DepartementService} from "../../../../../../shared/service/admin/departement/departement.service";
import {GenderDto} from "../../../../../../shared/model/employe/gender.model";
import {DepartementDto} from "../../../../../../shared/model/departement/departement.model";
import {PostDto} from "../../../../../../shared/model/employe/post.model";

@Component({
  selector: 'app-employe-create',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.css'
})
export class EmployeCreateComponent implements OnInit{
  ngOnInit(): void {
    this.gender = new GenderDto();
    this.genderService.findAll().subscribe((data) => this.genders = data);
    this.post = new PostDto();
    this.postService.findAll().subscribe((data) => this.posts = data);
    this.departement = new DepartementDto();
    this.departementService.findAll().subscribe((data) => this.departements = data);

  }
  visible: boolean = false;

  constructor(private service: EmployeService, private genderService: GenderService, private postService: PostService, private departementService: DepartementService) {
    this.service.visible$.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
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

  hideCreateDialog() {
    this.visible = false;
  }
}
