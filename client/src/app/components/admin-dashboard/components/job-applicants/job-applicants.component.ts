import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-job-applicants",
  templateUrl: "./job-applicants.component.html",
  styleUrls: ["./job-applicants.component.scss"],
})
export class JobApplicantsComponent implements OnInit {
  public jobId: string = "";
  public allJobApplicants: any = [];
  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getJobApplicants();
  }

  public getJobApplicants() {
    if (this.route.snapshot.paramMap.get("jobId")) {
      this.jobId = this.route.snapshot.paramMap.get("jobId");
      // console.log("JOBBB", this.jobId);
      this.jobService.getJobApplicants(this.jobId).subscribe((response) => {
        this.allJobApplicants = response.applications;
        console.log(response);
      });
    }
  }
}
