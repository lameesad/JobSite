import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public nameControl: FormControl = new FormControl("");
  public lastNameControl: FormControl = new FormControl("");
  public emailControl: FormControl = new FormControl("");
  public cvControl: FormControl = new FormControl("");

  userId: any = localStorage.getItem("id");
  user: any = [];
  cvFile: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getSingleUser();
  }

  public showUser() {
    this.userService.showUser().subscribe((response) => {
      // this.userId = response.user.userId;
      console.log(this.userId);
    });
  }
  public getSingleUser() {
    if (this.userId) {
      this.userService.getSingleUser(this.userId).subscribe((response) => {
        this.userId = response.user.userId;
        this.user = response.user;
        this.nameControl.setValue(this.user.name);
        this.lastNameControl.setValue(this.user.lastName);
        this.emailControl.setValue(this.user.email);
        this.cvControl.setValue(this.user.cv);
      });
    }
  }

  public updateUser() {
    console.log(this.cvControl.value.cvFile);
    this.userService
      .updateUser(
        this.nameControl.value,
        this.lastNameControl.value,
        this.emailControl.value,
        this.cvControl.value.cvFile
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  public onfilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // let formData = new FormData();

    // formData.append("filename", file);

    this.userService.uploadCv(file).subscribe(
      (response) => {
        this.cvFile = response.cvFile;
        console.log("response file picked", this.cvFile);
      },
      (error) => {
        console.log(error);
      }
    );
    this.cvControl.setValue(file);
    console.log(this.cvControl.value);
  }
}
