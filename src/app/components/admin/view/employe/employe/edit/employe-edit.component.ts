import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {GenderService} from "../../../../../../shared/service/admin/employe/gender.service";
import {PostService} from "../../../../../../shared/service/admin/employe/post.service";
import {DepartementService} from "../../../../../../shared/service/admin/departement/departement.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {PostDto} from "../../../../../../shared/model/employe/post.model";
import {GenderDto} from "../../../../../../shared/model/employe/gender.model";
import {DepartementDto} from "../../../../../../shared/model/departement/departement.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-employe-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './employe-edit.component.html',
  styleUrl: './employe-edit.component.css'
})
export class EmployeEditComponent implements OnInit{

  constructor(private service: EmployeService, private genderService: GenderService , private postService: PostService, private departementService: DepartementService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.gender = new GenderDto();
    this.genderService.findAll().subscribe((data) => this.genders = data);
    this.post = new PostDto();
    this.postService.findAll().subscribe((data) => this.posts = data);
    this.departement = new DepartementDto();
    this.departementService.findAll().subscribe((data) => this.departements = data);

  }

  public update(): void {
    this.service.update().subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'l\'employé a été édité avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'l\'employé n\'a pas été édité'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.editDialog = false;
  }
  hideCreateDialog() {
    this.editDialog = false;
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

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

}
