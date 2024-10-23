import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {DemandeDocumentUserService} from "../../../../../../shared/service/user/demande/demande-document-user.service";
import {TypeDocumentDto} from "../../../../../../shared/model/demande/type-document.model";
import {DemandeDocumentDto} from "../../../../../../shared/model/demande/demande-document.model";
import {TypeDocumentService} from "../../../../../../shared/service/user/demande/type-document.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeUserService} from "../../../../../../shared/service/user/employe/employe-user.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {ToastModule} from "primeng/toast";


@Component({
  selector: 'app-demande-document-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    SharedModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './demande-document-create.component.html',
  styleUrl: './demande-document-create.component.css'
})
export class DemandeDocumentCreateComponent implements OnInit{


  private employe: EmployeDto = new EmployeDto();
  protected matricule = localStorage.getItem('matricule');

  constructor(private service : DemandeDocumentUserService, private employeService: EmployeUserService,private typeDocumentService : TypeDocumentService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.typeDocument = new TypeDocumentDto();
    this.typeDocumentService.findAll().subscribe((data) => this.typeDocuments = data);
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

  public save(item : DemandeDocumentDto): void {
    item.employe = this.employe
    this.service.save().subscribe(data => {
      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le demande a été ajouté avec succès'});
        this.hideCreateDialog();
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'le demande n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
  }


  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
  get item(): DemandeDocumentDto{
    return this.service.item;
  }

  set item(value: DemandeDocumentDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeDocumentDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeDocumentDto>) {
    this.service.items = value;
  }

  get typeDocument(): TypeDocumentDto {
    return this.typeDocumentService.item;
  }
  set typeDocument(value: TypeDocumentDto) {
    this.typeDocumentService.item = value;
  }
  get typeDocuments(): Array<TypeDocumentDto> {
    return this.typeDocumentService.items;
  }
  set typeDocuments(value: Array<TypeDocumentDto>) {
    this.typeDocumentService.items = value;
  }

}
