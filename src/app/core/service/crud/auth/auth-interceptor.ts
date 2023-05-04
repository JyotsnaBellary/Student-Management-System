import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log("inside intercept", this.authService.getToken())
    let authToken = this.authService.getToken();
    if (!authToken) {
      // console.log(this.router.url)
      if (localStorage.getItem('token')) {
        this.authService.saveAuthData(localStorage.getItem('token') as string);
        authToken = this.authService.getToken();
      }
      else{
        this.router.navigate(['/']);
      }
    }
      // } else {
      //   // this.router.navigate(['/login']);
      //   return next.handle(req);
      // }
    // }
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
