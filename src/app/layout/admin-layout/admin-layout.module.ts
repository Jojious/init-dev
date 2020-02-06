import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '@app/view/dashboard/dashboard.component';
import { SalepageComponent } from '@app/view/salepage/salepage.component';
import { EmailEditorModule } from 'angular-email-editor';
import { AngularMaterialModule } from '@app/plugin/material/angular-material.module';
import { DialogBoxComponent } from '@app/components/dialog-box/dialog-box.component';
import { CheckregisterComponent } from '@app/view/admin/checkregister/checkregister.component';
import { HomepageComponent } from '@app/view/admin/homepage/homepage.component';
import { SalepageComponent as AdminSalePage } from '@app/view/admin/salepage/salepage.component';
import { FileComponent } from '@app/view/admin/file/file.component';
import { SettingComponent } from '@app/view/admin/setting/setting.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SalepageComponent,
    DialogBoxComponent,
    CheckregisterComponent,
    HomepageComponent,
    AdminSalePage,
    FileComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    EmailEditorModule,
    AngularMaterialModule
  ],
  entryComponents: [DialogBoxComponent]
})
export class AdminLayoutModule {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {}
}
