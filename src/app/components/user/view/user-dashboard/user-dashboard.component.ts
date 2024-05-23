import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from "../../../admin/view/admin-dashboard/pie-chart/pie-chart.component";
import {DatePipe, NgStyle, Time} from "@angular/common";
import {AuthenticationService} from "../../../../shared/security/shared/service/authentication.service";
import {PresenceUserService} from "../../../../shared/service/user/presence/presence-user.service";
import {PresenceDto} from "../../../../shared/model/presence/presence.model";
import {format} from 'date-fns';
import {EmployeUserService} from "../../../../shared/service/user/employe/employe-user.service";
import {HoraireUserService} from "../../../../shared/service/user/presence/horaire-user.service";
import {HoraireDto} from "../../../../shared/model/presence/horaire.model";
import {LayoutService} from "../../../../shared/service/layout/layout.service";
import {Router} from "@angular/router";
import {NotificationUserService} from "../../../../shared/service/user/notification/notification-user.service";
import {NotificationDto} from "../../../../shared/model/notification/notification.model";
import {ReunionUserService} from "../../../../shared/service/user/reunion/reunion-user.service";
import {ReunionDto} from "../../../../shared/model/reunion/reunion.model";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    NgStyle,
    DatePipe
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  isButtonClicked: boolean = false;
  datee: Date = new Date();
  debut: Date = new Date();
  fin: Date = new Date();
  nom: string = "";
  path: string = "";
  nbReunions: number = 0;
  public notifications: Array<NotificationDto>;
  currentNotificationIndex: number = 0;

  constructor(private authService: AuthenticationService, private presenceUserService: PresenceUserService,
              private employeService: EmployeUserService, private horaireService: HoraireUserService,
              private layoutService: LayoutService, private router: Router, private notificationService: NotificationUserService,
              private reunionService: ReunionUserService) {
    this.notifications = new Array<NotificationDto>();
  }

  onClicked() {
    if (this.notifications && this.notifications.length > 0 && this.currentNotificationIndex < this.notifications.length) {
      this.notifications[this.currentNotificationIndex].isChecked = true;
      this.notificationService.update(this.notifications[this.currentNotificationIndex]).subscribe({
        next: (response) => {
          console.error('Save successful:', response);
        },
        error: (error) => {
          console.error('Update failed:', error);
        }
      });
      this.currentNotificationIndex++;
      if (this.currentNotificationIndex >= this.notifications.length) {
        this.isButtonClicked = !this.isButtonClicked;
      }
    }
  }

  ngOnInit() {
    this.authService.findEmploye();
    const matricule = localStorage.getItem('matricule') as string;
    this.reunionService.findByEmployesMatricule(matricule).subscribe({
      next: (response) => {
        this.reunions = response;
      },
      error: (error) => {
        console.error('find failed:', error);
      }
    });
    this.nbReunions = this.reunions.length;
    this.employeService.findByMatricule(matricule).subscribe({
      next: (response) => {
        this.nom = response.nom as string;
        this.path = response.imagePath as string;
        this.horaire = response.horaire;
      },
      error: (error) => {
        console.error('find failed:', error);
      }
    });
    this.notificationService.findByMatriculeAndIsCheked(matricule, false).subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (error) => {
        console.error('find failed:', error);
      }
    });
  }

  parseDate(dateArray: number[] | any): string {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) {
      console.error('Invalid date array:', dateArray);
      return '';
    }
    const [hours, minutes, seconds] = dateArray;
    const formattedDate = `${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  showProfil() {
    this.layoutService.showProfil()
  }

  applyLeave() {
    this.router.navigate(['/app-user/demande-conge']);
  }

  clockIn() {
    this.datee = new Date();
    const dateString = format(this.datee, 'yyyy-MM-dd');
    this.item.datee = dateString;
    localStorage.setItem('datee', dateString);
    const matricule: string = localStorage.getItem('matricule') as string;
    this.employeService.findByMatricule(matricule).subscribe({
      next: (response) => {
        this.item.employe = response;
        this.presenceUserService.save().subscribe({
          next: (response) => {
            console.log('Save successful:', response);
          },
          error: (error) => {
            console.error('Save failed:', error);
          }
        });
      },
      error: (error) => {
        console.error('find failed:', error);
      }
    });
  }

  clockOut() {
    const dateString = localStorage.getItem('datee') as string;
    const matricule = localStorage.getItem('matricule') as string;
    this.presenceUserService.findByEmployeMatriculeAndDatee(matricule, dateString).subscribe({
      next: (presence) => {
        this.item = presence;
        this.presenceUserService.update().subscribe({
          next: (response) => {
            console.log('Update successful:', response);
          },
          error: (error) => {
            console.error('Update failed:', error);
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  get item(): PresenceDto {
    return this.presenceUserService.item;
  }

  set item(value: PresenceDto) {
    this.presenceUserService.item = value;
  }

  get horaire(): HoraireDto {
    return this.horaireService.item;
  }

  set horaire(value: HoraireDto) {
    this.horaireService.item = value;
  }

  get reunions(): Array<ReunionDto> {
    return this.reunionService.items;
  }

  set reunions(value: Array<ReunionDto>) {
    this.reunionService.items = value;
  }
}
