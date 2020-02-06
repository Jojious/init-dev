import { Routes } from '@angular/router';
import { DashboardComponent } from '@app/view/dashboard/dashboard.component';
import { SalepageComponent } from '@app/view/salepage/salepage.component';
import { CheckregisterComponent } from '@app/view/admin/checkregister/checkregister.component';
import { HomepageComponent } from '@app/view/admin/homepage/homepage.component';
import { SalepageComponent as AdminSalePage } from '@app/view/admin/salepage/salepage.component';
import { FileComponent } from '@app/view/admin/file/file.component';
import { SettingComponent } from '@app/view/admin/setting/setting.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'salepage', component: SalepageComponent },
  { path: 'checkregister', component: CheckregisterComponent },
  { path: 'adminhomepage', component: HomepageComponent },
  { path: 'adminsalepage', component: AdminSalePage },
  { path: 'adminfile', component: FileComponent },
  { path: 'adminsetting', component: SettingComponent }
];
