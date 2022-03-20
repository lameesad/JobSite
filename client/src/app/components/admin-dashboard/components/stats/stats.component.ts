import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  subscription: Subscription;
  allUsers: any;
  UsersSelected: any = [];
  users: any = [];
  search: any = "";
  emailControl: any = "";
  jobControl: any = "";
  skillControl: any = "";
  industryControl: any = "";
  highestLevelControl: any = "";
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
    console.log(this.UsersSelected);
    this.basicData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Users",
          data: [this.UsersSelected],
          fill: false,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    };
    console.log(this.basicData);
  }

  getAllUsers() {
    this.userService
      .getAllUsers(
        this.search,
        this.emailControl,
        this.jobControl,
        this.skillControl,
        this.industryControl,
        this.highestLevelControl
      )
      .subscribe((response) => {
        this.allUsers = response.users;
        this.allUsers.forEach((element: any) => {
          this.UsersSelected.push(new Date(element.created_at).getTime());
        });
      });
  }
}
