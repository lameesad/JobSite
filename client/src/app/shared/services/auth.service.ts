import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login, Register } from "../models/auth-data.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = "http://localhost:3000/api";
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer ")
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Credentials", "true")
      .set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  }

  public register(email: string, name: string, password: string): Observable<any> {
    const registerData: Register = { name: name, email: email, password: password };
    return this.http.post(this.baseUrl + "/v1/auth/register", JSON.stringify(registerData), {
      headers: this.headers,
    });
  }

  public login(email: string, password: string): Observable<any> {
    const loginData: Login = { email: email, password: password };
    return this.http.post(this.baseUrl + "/v1/auth/login", JSON.stringify(loginData), {
      headers: this.headers,
    });
  }
}
