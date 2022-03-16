import { Component } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public title = "angular-Jobs";
  public role: string | null = "";

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (localStorage.getItem("role")) {
      this.role = localStorage.getItem("role");
    }
  }
}
