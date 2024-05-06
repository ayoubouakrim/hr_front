import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
  ],

})
export class AppModule {

}
