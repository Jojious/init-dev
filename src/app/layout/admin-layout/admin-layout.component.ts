import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthenticationService } from '@app/services';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  user: string;
  screenWidth: number;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  @ViewChild('sidenav') sidenav: MatSidenav;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue.role;
    this.screenWidth$.subscribe(width => {
      this.screenWidth = width;
    });
  }
  signOut() {
    this.authenticationService.logout();
  }
  gotohome() {
    this.router.navigate(['/']);
  }
}
