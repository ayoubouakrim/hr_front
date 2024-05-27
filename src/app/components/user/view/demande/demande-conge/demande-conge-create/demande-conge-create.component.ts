import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {DemandeCongeUserService} from "../../../../../../shared/service/user/demande/demande-conge-user.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {TypeCongeService} from "../../../../../../shared/service/user/conge/type-conge.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeUserService} from "../../../../../../shared/service/user/employe/employe-user.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";

@Component({
  selector: 'app-demande-conge-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './demande-conge-create.component.html',
  styleUrl: './demande-conge-create.component.css'
})
export class DemandeCongeCreateComponent implements OnInit{

  private employe: EmployeDto = new EmployeDto();
  protected matricule = localStorage.getItem('matricule');

  constructor(private service : DemandeCongeUserService, private typeCongeService : TypeCongeService, private messageService: MessageService, private employeService: EmployeUserService) {

  }

  ngOnInit(): void {
    this.typeConge = new TypeCongeDto();
    this.typeCongeService.findAll().subscribe((data) => this.typeConges = data);
    this.findProfile(this.matricule as string)
  }

  public findProfile(matricule: String){
    this.employeService.findProfile(matricule).subscribe(res => {
      this.employe = res
      console.log(this.item);
    });
  }
  hideCreateDialog() {
    this.createDialog = false;
  }

  public save(item : DemandeCongeDto): void {
    item.employe = this.employe;
    this.service.save(item).subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le Congé a été ajouté avec succès'});
        this.items.push(data);
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'le conge n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.hideCreateDialog()
  }

  get item(): DemandeCongeDto{
    return this.service.item;
  }

  set item(value: DemandeCongeDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeCongeDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeCongeDto>) {
    this.service.items = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get typeConge(): TypeCongeDto {
    return this.typeCongeService.item;
  }
  set typeConge(value: TypeCongeDto) {
    this.typeCongeService.item = value;
  }
  get typeConges(): Array<TypeCongeDto> {
    return this.typeCongeService.items;
  }
  set typeConges(value: Array<TypeCongeDto>) {
    this.typeCongeService.items = value;
  }
}
