import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
})
export class AllUsersComponent implements OnInit {
  public allUsers: any = [];
  public searchControl: FormControl = new FormControl("");
  public emailControl: FormControl = new FormControl("");
  public skillControl: FormControl = new FormControl("");
  public industryControl: FormControl = new FormControl("");
  public highestLevelControl: FormControl = new FormControl("");
  public jobControl: FormControl = new FormControl("");

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService
      .getAllUsers(
        this.searchControl.value,
        this.emailControl.value,
        this.jobControl.value,
        this.skillControl.value,
        this.industryControl.value,
        this.highestLevelControl.value
      )
      .subscribe((response) => {
        this.allUsers = response.users;
        console.log(this.allUsers);
      });
  }

  public search() {
    this.userService
      .getAllUsers(
        this.searchControl.value,
        this.emailControl.value,
        this.jobControl.value,
        this.skillControl.value,
        this.industryControl.value,
        this.highestLevelControl.value
      )
      .subscribe((response) => {
        if (response) {
          this.allUsers = response.users;
        }
      });
  }
}
