import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './view/log-in/log-in.component';
import { RegisterComponent } from './view/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from '@app/layout/user-layout/user-layout.component';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { HomeComponent } from '@app/view/home/home.component';
import { AuthGuard } from './helps';
// import { Role } from './models';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    // data: [Role.Admin],
    children: [
      {
        path: '',
        loadChildren:
          './layout/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'usersalepage',
    canActivate: [AuthGuard],
    // data: { roles: [Role.User] }
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    // data: { roles: [Role.User] },
    children: [
      {
        path: '',
        loadChildren:
          './layout/user-layout/user-layout.module#UserLayoutModule'
      }
    ]
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
