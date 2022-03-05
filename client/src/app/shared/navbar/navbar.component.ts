import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => this.router.navigate(['home']),
      },
      {
        label: 'Jobs',
        icon: 'pi pi-fw pi-list',
        command: () => this.router.navigate(['jobs']),
      },
    ];
  }

  public isLoggedIn(): boolean {
    if (window.location.href.indexOf('login') === -1) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    // this.tokenStorage.signOut();
    // this.router.navigate(['login'], {replaceUrl: true});
  }

  public navigate(path: any) {
    this.router.navigate([path]);
  }
}
