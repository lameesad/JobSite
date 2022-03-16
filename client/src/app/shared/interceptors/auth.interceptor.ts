import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { TokenService } from "../services/token.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl = "http://localhost:3000/api";
  constructor(
    private token: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    let authReq = req.clone({ setHeaders: { token: "token" } });
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) });
    }

    return next.handle(authReq).pipe(
      tap(
        (data: HttpResponse<any>) => {
          if (data instanceof HttpResponse) {
            // console.log("token is");
            // console.log(data);
            // console.log(token);
            if (data.headers.get("token")) {
              console.log(data.headers.get("token"));
              this.token.saveToken(data.headers.get("token"));
            }
          }
        },
        (err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            if ([401].includes(err.status) && this.token.getToken()) {
              this.token.signOut();
              this.router.navigate(["login"], { replaceUrl: true });
            } else if ([401].includes(err.status) && !this.token.getToken()) {
              this.token.signOut();
              this.router.navigate(["login"], { replaceUrl: true });
              localStorage.clear();
            }
          }
        }
      )
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
