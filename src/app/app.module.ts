// load angular packages
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './auth/authorization.interceptor';

// load components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/common/landing-pages/home/home.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { LayoutLoggedUserComponent } from './components/common/layout-logged-user/layout-logged-user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SuperAdminComponent } from './modules/super-admin/super-admin.component';
import { AdminComponent } from './modules/admin/admin.component';
import { SuperAdminDashboardComponent } from './components/super-admin/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './components/super-admin/admin-list/admin-list.component';
import { SuperAdminSettingsComponent } from './components/super-admin/super-admin-settings/super-admin-settings.component';
import { SuperAdminReportsComponent } from './components/super-admin/super-admin-reports/super-admin-reports.component';
import { CreateAdminComponent } from './components/super-admin/admin-list/create-admin/create-admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CandidateListComponent } from './components/admin/candidate-list/candidate-list.component';
import { CreateCandidateComponent } from './components/admin/candidate-list/create-candidate/create-candidate.component';

// load landing page routes
import { armyHomeRouter } from './app.landing-routes';

// load dashboard page routes
import { superAdminRoute } from './app.super-admin-routes';
import { adminRoute } from './app.admin-routes';

// load services
import { SignInService } from './services/signIn-service/sign-in.service';
import { SuperAdminSettingsService } from './services/superAdmin/settings-service/super-admin-settings.service';
import { CandidateListService } from './services/admin/candidate-list-service/candidate-list.service';
import { AdminListService } from './services/superAdmin/admin-list-service/admin-list.service';

// thirdparty libraries
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DataTableModule } from 'angular2-datatable';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AdminSearchPipe } from './pipes/super-admin/admin-search.pipe';
import { CandidateSearchPipe } from './pipes/candidates/candidate-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignInComponent,
    LayoutLoggedUserComponent,
    SidebarComponent,
    SuperAdminComponent,
    AdminComponent,
    SuperAdminDashboardComponent,
    AdminListComponent,
    SuperAdminSettingsComponent,
    SuperAdminReportsComponent,
    CreateAdminComponent,
    AdminDashboardComponent,
    CandidateListComponent,
    CreateCandidateComponent,
    AdminSearchPipe,
    CandidateSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    HttpModule,
    HttpClientModule,
    armyHomeRouter,
    superAdminRoute,
    adminRoute,
    DataTableModule,
    MaterialModule,
    BrowserAnimationsModule,
    CdkTableModule,
    NoopAnimationsModule,
  ],
  providers: [
    SignInService,
    CookieService,
    SuperAdminSettingsService,
    AdminListService,
    CandidateListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
