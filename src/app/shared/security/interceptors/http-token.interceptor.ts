import {HttpHeaders, HttpInterceptorFn} from "@angular/common/http";
import {TokenService} from "../shared/service/token.service";
import {inject} from "@angular/core";

export const httpTokenInterceptor : HttpInterceptorFn = (request, next)=>{
  let tokenService = inject(TokenService);
  const token = tokenService.token;
    if (token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
      return next(authReq);
    }
    return next(request);
}
