import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JobService {
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

  public getAllJobs(search: string): Observable<any> {
    const params = new HttpParams().set("search", search + "");

    return this.http.get(this.baseUrl + "/v1/jobs/", {
      params: params,
      headers: this.headers,
    });
  }

  public addJob(company: string, position: string): Observable<any> {
    const addJobData = { company: company, position: position };
    return this.http.post(this.baseUrl + "/v1/jobs", JSON.stringify(addJobData), {
      headers: this.headers,
    });
  }

  public updateJob(jobId: string, company: string, position: string): Observable<any> {
    const updateJobData = { company: company, position: position };
    return this.http.patch(this.baseUrl + "/v1/jobs/" + jobId + JSON.stringify(updateJobData), {
      headers: this.headers,
    });
  }

  public deleteJob(jobId: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/v1/jobs/" + jobId, {
      headers: this.headers,
    });
  }

  public getJobApplicants(jobId: string): Observable<any> {
    const job = { job: jobId };
    return this.http.get(this.baseUrl + "/v1/job/" + jobId + "/applications", {
      headers: this.headers,
    });
  }

  public applyJob(jobId: string): Observable<any> {
    const job = { job: jobId };
    return this.http.post(
      this.baseUrl + "/v1/job/" + jobId + "/applications",
      JSON.stringify(job),
      {
        headers: this.headers,
      }
    );
  }
}
