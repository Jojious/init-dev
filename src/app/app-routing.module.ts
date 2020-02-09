import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './view/log-in/log-in.component';
import { RegisterComponent } from './view/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from '@app/layout/user-layout/user-layout.component';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { HomecontactComponent } from './components/homepage/homecontact/homecontact.component';
import { HomeaboutComponent } from './components/homepage/homeabout/homeabout.component';
import { HomeproductComponent } from './components/homepage/homeproduct/homeproduct.component';
import { HomeserviceComponent } from './components/homepage/homeservice/homeservice.component';
import { HomeComponent } from '@app/view/home/home.component';
import { AuthGuard } from './helps';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homecontact', component: HomecontactComponent },
  { path: 'homeabout', component: HomeaboutComponent },
  { path: 'homeproduct', component: HomeproductComponent },
  { path: 'homeservice', component: HomeserviceComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren:
          './layout/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren:
          './layout/user-layout/user-layout.module#UserLayoutModule'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/checkregister',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'pagenotfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
