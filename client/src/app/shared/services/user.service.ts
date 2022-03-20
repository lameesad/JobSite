import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { last } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "http://localhost:3000/api";
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + localStorage.getItem("token"))
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  }

  public getAllUsers(
    search: string,
    email: string,
    jobTitle: string,
    skills: string,
    industry: string,
    highestLevel: string
  ): Observable<any> {
    const params = new HttpParams()
      .set("search", search + "")
      .set("email", email + "")
      .set("jobTitle", jobTitle + "")
      .set("skills", skills + "")
      .set("industry", industry + "")
      .set("highestLevel", highestLevel + "");
    return this.http.get(this.baseUrl + "/v1/users/", {
      params: params,
      headers: this.headers,
    });
  }

  public updateUser(name: string, lastName: string, email: string, cv: File): Observable<any> {
    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("lastName", lastName);
    updateData.append("email", email);
    updateData.append("fileCv", cv, name);
    // const updateUserData = { name: name, lastName: lastName, email: email, cv: cv };
    return this.http.patch(this.baseUrl + "/v1/users/updateUser/", updateData, {});
  }

  public uploadCv(cv: File): Observable<any> {
    const uploadData: FormData = new FormData();
    uploadData.append("cvFile", cv, cv.name);
    console.log(uploadData);
    return this.http.post(this.baseUrl + "/v1/users/uploadCv/", uploadData, {});
  }

  public showUser(): Observable<any> {
    return this.http.get(this.baseUrl + "/v1/users/showMe/", {
      headers: this.headers,
    });
  }

  public getSingleUser(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/v1/users/" + userId, {
      headers: this.headers,
    });
  }
}
