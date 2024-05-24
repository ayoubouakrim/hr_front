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
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {User} from "../../../../../../shared/security/shared/model/user.model";
import {UserService} from "../../../../../../shared/security/shared/service/user.service";


@Component({
  selector: 'app-employe-create',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.css'
})
export class EmployeCreateComponent implements OnInit{

  private imgPath = "assets/empImages/default-avatar.jpg";
  ngOnInit(): void {
    this.gender = new GenderDto();
    this.genderService.findAll().subscribe((data) => this.genders = data);
    this.post = new PostDto();
    this.postService.findAll().subscribe((data) => this.posts = data);
    this.departement = new DepartementDto();
    this.departementService.findAll().subscribe((data) => this.departements = data);
    this.horaire = new HoraireDto();
    this.horaireService.findAll().subscribe((data) => this.horaires = data);
    this.user = new User();
    this.userService.findAll().subscribe( (data) => this.users = data);

    console.log(this.item.imagePath);
  }
  visible: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService, private service: EmployeService, private genderService: GenderService, private postService: PostService, private departementService: DepartementService, private horaireService: HoraireAdminService) {

  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imgPath = "assets/empImages/" + file.name;
      this.item.imagePath = "assets/empImages/" + file.name;

    }

  }


  public save(): void {
    console.log(this.item)
    this.service.save().subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'l\'employé a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'l\'employé n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.createDialog = false;
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



  get user(): User {
    return this.userService.item;
  }
  set user(value: User) {
    this.userService.item = value;
  }
  get users(): Array<User> {
    return this.userService.items;
  }
  set users(value: Array<User>) {
    this.userService.items = value;
  }
  get horaire(): HoraireDto {
    return this.horaireService.item;
  }
  set horaire(value: HoraireDto) {
    this.horaireService.item = value;
  }
  get horaires(): Array<HoraireDto> {
    return this.horaireService.items;
  }
  set horaires(value: Array<HoraireDto>) {
    this.horaireService.items = value;
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

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  hideCreateDialog() {
    this.createDialog = false;
  }

}
