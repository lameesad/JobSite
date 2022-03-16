import { Component, OnInit } from "@angular/core";
import { stringify } from "querystring";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-all-jobs",
  templateUrl: "./all-jobs.component.html",
  styleUrls: ["./all-jobs.component.scss"],
})
export class AllJobsComponent implements OnInit {
  public allJobs: any = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((response) => {
      this.allJobs = response;
      this.allJobs = this.allJobs.jobs;
      console.log(this.allJobs);
    });
  }

  updateJob(jobId: string, company: string, position: string) {
    this.jobService.updateJob(jobId, company, position).subscribe((response) => {
      console.log(response);
    });
  }
  deleteJob(jobId: string) {
    this.jobService.deleteJob(jobId).subscribe((response) => {
      console.log(response);
    });
  }
}
