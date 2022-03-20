import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { TokenService } from "src/app/shared/services/token.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  isLoading: boolean = false;
  role: string = "";
  name: string = "";
  id: string = "";
  token: string = "";
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public open(path: string): void {
    this.router.navigateByUrl(path);
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (response) => {
        this.role = response.user.role;
        this.name = response.user.name;
        this.id = response.user.userId;
        this.tokenService.saveToken(response.token);
        localStorage.setItem("role", this.role);
        localStorage.setItem("name", this.name);
        localStorage.setItem("id", this.id);
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
