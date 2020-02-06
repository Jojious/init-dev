import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLayoutRoutes } from './user-layout.routing';
import { AngularMaterialModule } from '@app/plugin/material/angular-material.module';
import { UserSalePageComponent } from '@app/view/user-sale-page/user-sale-page.component';

@NgModule({
  declarations: [UserSalePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    AngularMaterialModule,
  ]
})
export class UserLayoutModule {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {}
 }
