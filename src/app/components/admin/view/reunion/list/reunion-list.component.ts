import {Component, signal, ChangeDetectorRef, OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {ReunionService} from "../../../../../shared/service/admin/reunion/reunion.service";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ButtonModule} from "primeng/button";
import {ReunionCreateComponent} from "../create/reunion-create.component";
import {ReunionViewComponent} from "../view/reunion-view.component";




@Component({
  selector: 'app-reunion-list',
  standalone: true,
  imports: [
    FullCalendarModule,
    ButtonModule,
    ReunionCreateComponent,
    ReunionViewComponent
  ],
  templateUrl: './reunion-list.component.html',
  styleUrl: './reunion-list.component.css'
})


export class ReunionListComponent implements OnInit{
  events: EventInput[] = [];
  constructor(private changeDetector: ChangeDetectorRef, private service: ReunionService) {
  }

  ngOnInit(): void {
    this.findAll();
    console.log("hhhhhh", this.events);
    console.log("bbbbbbbb" + this.calendarOptions);
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
      console.log('Clicked event ID:', eventId);
      this.service.findByCode(eventId).subscribe(res => {
        this.item = res;
        this.viewDialog = true;
      });
    }



  }

  public handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id;
    console.log('Clicked event ID:', eventId);
  };

  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
      console.log("Items:", this.items);
      this.mapItemsToEvents();
      console.log("Events:", this.events);

    });
  }

  mapItemsToEvents(): void {
    this.calendarOptions.events = this.items.map(reunion => ({
      id: reunion.code as string,
      title: reunion.title as string,
      start: new Date(reunion.date + 'T' + reunion.heureDebut),
      end: new Date(reunion.date + 'T' + reunion.heureFin),
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

  showDialog(): void {
    this.createDialog = true;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}

