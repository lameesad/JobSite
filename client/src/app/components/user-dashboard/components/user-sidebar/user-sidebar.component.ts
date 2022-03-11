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
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: "File",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            items: [{ label: "Project" }, { label: "Other" }],
          },
          { label: "Open" },
          { label: "Quit" },
        ],
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          { label: "Delete", icon: "pi pi-fw pi-trash" },
          { label: "Refresh", icon: "pi pi-fw pi-refresh" },
        ],
      },
    ];
  }
}
