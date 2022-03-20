import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-edit-job",
  templateUrl: "./edit-job.component.html",
  styleUrls: ["./edit-job.component.scss"],
})
export class EditJobComponent implements OnInit {
  public positionControl: FormControl = new FormControl("");
  public companyControl: FormControl = new FormControl("");
  public jobId: any;
  public index: any;
  public search: any = "";
  public allJobs: any = [];
  public job: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    localStorage.getItem("role");
    if (this.route.snapshot.paramMap.get("jobId")) {
      this.jobId = this.route.snapshot.paramMap.get("jobId");
      this.jobService.getAllJobs(this.search).subscribe((response: any) => {
        this.index = response.jobs.findIndex((obj) => obj._id == this.jobId);
        this.allJobs = response.jobs[this.index];
        this.positionControl.setValue(this.allJobs.position);
        this.companyControl.setValue(this.allJobs.company);
      });
      // this.router.navigate(["all-jobs"]);
    }
  }

  editJob() {
    this.jobService
      .updateJob(this.jobId, this.positionControl.value, this.companyControl.value)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
