import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const TOKEN_KEY = "token";
const USER_KEY = "token";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor() {}

  signOut(): void {
    localStorage.removeItem("token");
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem("token");
    localStorage.clear();
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  getPermissions() {
    let permissionsList = this.parseJwt(this.getToken());
    let permissions = permissionsList.permissions;
    return permissions;
  }
}
