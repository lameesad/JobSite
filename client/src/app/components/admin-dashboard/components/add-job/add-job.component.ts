import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobService } from "src/app/shared/services/job.service";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent implements OnInit {
  form: any = {
    company: null,
    position: null,
  };
  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { company, position } = this.form;
    localStorage.getItem("role");
    this.jobService.addJob(company, position).subscribe((response) => {
      console.log(response);
    });
  }
}
