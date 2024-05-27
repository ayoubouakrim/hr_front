import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions, EventInput} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ReunionUserService} from "../../../../../shared/service/user/reunion/reunion-user.service";
import {ReunionViewComponent} from "../view/reunion-view.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ButtonModule,
    FullCalendarModule,
    ReunionViewComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  events: EventInput[] = [];
  constructor(private changeDetector: ChangeDetectorRef, private service: ReunionUserService) {
  }

  ngOnInit(): void {
    this.findByEmployesMatricule();
  }

  calendarOptions : CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    initialView: 'dayGridMonth',

    weekends: true,
    eventClick: (clickInfo: any) => {
      const eventId: String = clickInfo.event.id;
      this.service.findByCode(eventId).subscribe(res => {
        this.item = res;
        this.viewDialog = true;
      });
    }
  }

  public handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id;
  };

  public findByEmployesMatricule(): void {
    const matricule = localStorage.getItem('matricule') as string;
    this.service.findByEmployesMatricule(matricule).subscribe(data => {
      this.items = data;
      this.mapItemsToEvents();
    });
  }

  mapItemsToEvents(): void {
    this.calendarOptions.events = this.items.map(reunion => ({
      id: reunion.code as string,
      title: reunion.title as string,
      start: new Date(reunion.date[0], reunion.date[1] - 1, reunion.date[2], reunion.heureDebut[0], reunion.heureDebut[1]),
      end: new Date(reunion.date[0], reunion.date[1] - 1, reunion.date[2], reunion.heureFin[0], reunion.heureFin[1]),
      eventColor: '#2196f3',
      backgroundColor: '#F2BC57'
    }));
    this.changeDetector.detectChanges();
  }

  get item(): ReunionDto {
    return this.service.item;
  }

  set item(value: ReunionDto) {
    this.service.item = value;
  }

  get items(): Array<ReunionDto> {
    return this.service.items;
  }

  set items(value: Array<ReunionDto>) {
    this.service.items = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
