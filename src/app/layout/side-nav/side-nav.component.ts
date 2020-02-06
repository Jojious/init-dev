import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'dashboard'},
  // { path: '/admin/salepage', title: 'Create Sale Page', icon: 'desktop_mac'},
  { path: '/admin/checkregister', title: 'Check Register', icon: 'accessibility'},
  { path: '/admin/adminhomepage', title: 'Home Page', icon: 'home'},
  { path: '/admin/adminsalepage', title: 'Sale Page', icon: 'shop'},
  { path: '/admin/adminfile', title: 'File', icon: 'attach_file'},
  { path: '/admin/adminsetting', title: 'Setting', icon: 'settings'}
];

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public menuItems: any[];
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
