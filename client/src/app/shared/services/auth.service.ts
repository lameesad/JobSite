import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthData } from "../models/auth-data.model";

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
      .set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  }

  public register(email: string, name: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    return this.http.post(this.baseUrl + "/v1/auth/register", JSON.stringify(authData), {
      headers: this.headers,
    });
  }
}
