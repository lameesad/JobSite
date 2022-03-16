import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  isLoading: boolean = false;
  role: string = "";
  token: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { email, username, password } = this.form;
    this.isLoading = true;
    this.authService.register(email, username, password).subscribe(
      (response) => {
        this.role = response.user.role;
        this.token = response.token;
        localStorage.setItem("role", this.role);
        localStorage.setItem("token", this.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if (this.role === "user") {
          this.router.navigate(["user-dashboard"], { replaceUrl: true });
        } else if (this.role === "admin") {
          this.router.navigate(["admin-dashboard"], { replaceUrl: true });
        }

        this.isLoading = false;
      },
      (err) => {
        this.errorMessage = err.error.msg;
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
  }
}
