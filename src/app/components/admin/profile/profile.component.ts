import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../shared/model/employe/employe.model";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  ngOnInit(): void {
      this.findProfile(this.matricule as string);

  }
  constructor(private employeService: EmployeService) {
  }

  matricule = localStorage.getItem('matricule');

  public findProfile(matricule: String){
    this.employeService.findProfile(matricule).subscribe(res => {
      this.item = res
      console.log(this.item);
    });
  }


  get item(): EmployeDto {
    return this.employeService.item;
  }

  set item(value: EmployeDto) {
    this.employeService.item = value;
  }

  get items(): Array<EmployeDto> {
    return this.employeService.items;
  }

  set items(value: Array<EmployeDto>) {
    this.employeService.items = value;
  }

}
