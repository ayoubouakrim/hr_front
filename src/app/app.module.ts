import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FullCalendarModule } from '@fullcalendar/angular/full-calendar.module';

import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
  ],


})
export class AppModule {

}
