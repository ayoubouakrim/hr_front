import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from "../../../admin/view/admin-dashboard/pie-chart/pie-chart.component";
import {CommonModule, DatePipe, NgStyle} from "@angular/common";
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
import {EmployeDto} from "../../../../shared/model/employe/employe.model";
import {CongeUserService} from "../../../../shared/service/user/conge/conge-user.service";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    CommonModule,
    NgStyle,
    DatePipe
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  datee: Date = new Date();
  debut: Date = new Date();
  fin: Date = new Date();
  totaleCongeDispo: number = 0;
  anneeActuelle: number = 0;

  constructor(private presenceUserService: PresenceUserService,
              private employeService: EmployeUserService, private horaireService: HoraireUserService,
              private layoutService: LayoutService, private router: Router, private notificationService: NotificationUserService,
              private reunionService: ReunionUserService, private congeService: CongeUserService) {
  }

  ngOnInit() {
    let username = localStorage.getItem('username')
    if (username) {
      this.employeService.findByUserUsername(username).subscribe({
        next: (res) => {
          this.employe = res;
          this.horaire = res.horaire;
          let matricule = res.matricule as string;
          localStorage.setItem('matricule', matricule);
          if (matricule) {
            this.reunionService.findByEmployesMatricule(matricule).subscribe({
              next: (response) => {
                // Get the current date
                const currentDate = new Date();
                this.reunions = response.filter(reunion => {
                  // Assuming reunion.date is the date attribute of each reunion object
                  const reunionDate = new Date(reunion.date);
                  return reunionDate.toDateString() === currentDate.toDateString();
                });

              },
              error: (error) => {
                console.error('find failed:', error);
              }
            });
            this.notificationService.findByMatriculeAndCheked(matricule, false).subscribe({
              next: (response) => {
                this.arrayOfNotifications = response;
              },
              error: (error) => {
                console.error('find failed:', error);
              }
            });
            this.caculeCongeDispo();
          }
        },
        error: (error) => {
          console.error("Erreur lors de la recherche de l'employé : ", error);
        }
      });
    }
    const dateActuelle: Date = new Date();
    this.anneeActuelle = dateActuelle.getFullYear();
  }

  parseDate(dateArray: number[] | any): string {
    if(dateArray) {
      if (dateArray || Array.isArray(dateArray) || dateArray.length == 3) {
        const [hours = 0, minutes = 0, seconds = 0] = dateArray;
        const formattedHours = this.padWithZero(hours);
        const formattedMinutes = this.padWithZero(minutes);
        const formattedSeconds = this.padWithZero(seconds);
        const formattedDate = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        return formattedDate;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  padWithZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
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
        console.error('Save failed:', error);
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

  convertirEnMots(nombre: number): string {
    if (nombre === 0) {
      return 'zéro';
    }
    const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const dixAvingt = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const dizaines = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const grandesUnites = ['', 'mille', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard', 'quadrillion', 'quadrilliard'];
    const mots: string[] = [];
    let i = 0;
    while (nombre > 0) {
      const troisChiffres = nombre % 1000;
      if (troisChiffres !== 0) {
        const motsTroisChiffres = [];
        const centaines = Math.floor(troisChiffres / 100);
        const resteCentaines = troisChiffres % 100;
        if (centaines > 1) {
          motsTroisChiffres.push(unites[centaines] + ' cents');
        } else if (centaines === 1) {
          motsTroisChiffres.push('cent');
        }
        if (resteCentaines >= 10 && resteCentaines < 20) {
          motsTroisChiffres.push(dixAvingt[resteCentaines - 10]);
        } else {
          const dizaine = Math.floor(resteCentaines / 10);
          const unite = resteCentaines % 10;
          if (dizaine > 0) {
            motsTroisChiffres.push(dizaines[dizaine]);
          }
          if (unite > 0) {
            motsTroisChiffres.push(unites[unite]);
          }
        }
        const uniteGrande = grandesUnites[i];
        if (uniteGrande) {
          motsTroisChiffres.push(uniteGrande);
        }
        mots.unshift(motsTroisChiffres.join(' '));
      }
      nombre = Math.floor(nombre / 1000);
      i++;
    }
    return mots.join(' ');
  }

  caculeCongeDispo() {
    this.congeService.caculeCongeDispo().subscribe({
      next: (response) => {
        this.totaleCongeDispo = Math.floor(response);
      },
      error: (error) => {
        console.error('find failed:', error);
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

  get employe(): EmployeDto {
    return this.employeService.item;
  }

  set employe(value: EmployeDto) {
    this.employeService.item = value;
  }

  set arrayOfNotifications(value: Array<NotificationDto>) {
    this.notificationService.notifications = value;
  }
}
