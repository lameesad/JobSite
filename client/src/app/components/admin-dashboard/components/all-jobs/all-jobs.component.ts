import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-all-jobs",
  templateUrl: "./all-jobs.component.html",
  styleUrls: ["./all-jobs.component.scss"],
})
export class AllJobsComponent implements OnInit {
  public allJobs: any = [];
  public searchControl: FormControl = new FormControl("");
  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs(this.searchControl.value).subscribe((response) => {
      this.allJobs = response;
      this.allJobs = this.allJobs.jobs;
      console.log(this.allJobs);
    });
  }
  public search() {
    this.jobService.getAllJobs(this.searchControl.value).subscribe((response) => {
      if (response) {
        this.allJobs = response;
        this.allJobs = this.allJobs.jobs;
      }
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
      this.getAllJobs();
    });
  }

  public ViewJobApplicants(jobId: any) {
    this.router.navigate(["job-applicants", { jobId: jobId }]);
  }

  public editJob(jobId: any) {
    this.router.navigate(["edit-job", { jobId: jobId }]);
  }
}
