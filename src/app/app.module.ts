import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgModule} from "@angular/core";



@NgModule({
  imports: [

    BrowserAnimationsModule,
    BrowserModule,
    FullCalendarModule
  ]

})
export class AppModule {

}
