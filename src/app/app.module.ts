import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular/full-calendar.module';
import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient,
    DatePipe,
  ],


})
export class AppModule {
}
