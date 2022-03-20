import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-user-jobs",
  templateUrl: "./user-jobs.component.html",
  styleUrls: ["./user-jobs.component.scss"],
})
export class UserJobsComponent implements OnInit {
  public allJobs: any = [];
  public searchControl: FormControl = new FormControl("");
  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs(this.searchControl.value).subscribe((response) => {
      this.allJobs = response.jobs;
    });
  }

  applyJob(job: any) {
    this.jobService.applyJob(job).subscribe((response) => {
      console.log(response);
    });
  }
}
