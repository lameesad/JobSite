import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-user-sidebar",
  templateUrl: "./user-sidebar.component.html",
  styleUrls: ["./user-sidebar.component.scss"],
})
export class UserSidebarComponent implements OnInit {
  public items: MenuItem[] = [];
  public role: string | null = "";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      { label: "New", icon: "pi pi-fw pi-plus" },
      { label: "Open", icon: "pi pi-fw pi-download" },
      { label: "Undo", icon: "pi pi-fw pi-refresh" },
    ];

    // this.items = [
    //   {
    //     label: "File",
    //     items: [
    //       {
    //         label: "New",
    //         icon: "pi pi-fw pi-plus",
    //         items: [{ label: "Project" }, { label: "Other" }],
    //       },
    //       { label: "Open" },
    //       { label: "Quit" },
    //     ],
    //   },
    //   {
    //     label: "Edit",
    //     icon: "pi pi-fw pi-pencil",
    //     items: [
    //       { label: "Delete", icon: "pi pi-fw pi-trash" },
    //       { label: "Refresh", icon: "pi pi-fw pi-refresh" },
    //     ],
    //   },
    // ];
  }

  public isLoggedIn(): boolean {
    if (this.router.url.includes("login") || this.router.url.includes("register") || this.router.url.includes("home")) {
      return false;
    } else {
      setTimeout(() => {
        this.trying();
      }, 1000);
      return true;
    }
  }

  public trying() {
    if (localStorage.getItem("role")) {
      this.role = localStorage.getItem("role");
    }
  }
  public open(key: string) {
    this.router.navigateByUrl(key);
  }
}
