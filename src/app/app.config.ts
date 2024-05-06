import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import {httpTokenInterceptor} from "./shared/security/interceptors/http-token.interceptor";

export let appConfig: ApplicationConfig;
appConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptors([httpTokenInterceptor]))]
};
