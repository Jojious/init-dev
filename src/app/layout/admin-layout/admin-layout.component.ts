import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  user: string;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue.role;
  }
  signOut() {
    this.authenticationService.logout();
  }
  gotohome() {
    this.router.navigate(['/']);
  }
}
