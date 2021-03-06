import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './plugin/material/angular-material.module';
import { LogInComponent } from './view/log-in/log-in.component';
import { RegisterComponent } from './view/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helps';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HomeComponent } from './view/home/home.component';
import { ServicesComponent } from './view/services/services.component';
import { ProductComponent } from './view/product/product.component';
import { AboutComponent } from './view/about/about.component';
import { ContactComponent } from './view/contact/contact.component';
import { HomecontactComponent } from './components/homepage/homecontact/homecontact.component';
import { HomeaboutComponent } from './components/homepage/homeabout/homeabout.component';
import { HomeproductComponent } from './components/homepage/homeproduct/homeproduct.component';
import { HomeserviceComponent } from './components/homepage/homeservice/homeservice.component';
import { MatFormioModule } from 'angular-material-formio';
import { DefaultComponent } from './layout/default/default.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    AdminLayoutComponent,
    SideNavComponent,
    PageNotFoundComponent,
    UserLayoutComponent,
    HomeComponent,
    ServicesComponent,
    ProductComponent,
    AboutComponent,
    ContactComponent,
    HomecontactComponent,
    HomeaboutComponent,
    HomeproductComponent,
    HomeserviceComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatFormioModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
