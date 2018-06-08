import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './modules/super-admin/super-admin.component';
import { SuperAdminDashboardComponent } from './components/super-admin/super-admin-dashboard/super-admin-dashboard.component';
import { SignInService } from './services/signIn-service/sign-in.service';
import { AdminListComponent } from './components/super-admin/admin-list/admin-list.component';
import { SuperAdminSettingsComponent } from './components/super-admin/super-admin-settings/super-admin-settings.component';
import { SuperAdminReportsComponent } from './components/super-admin/super-admin-reports/super-admin-reports.component';
import { CreateAdminComponent } from './components/super-admin/admin-list/create-admin/create-admin.component';
import { CandidateListComponent } from './components/admin/candidate-list/candidate-list.component';
import { CreateCandidateComponent } from './components/admin/candidate-list/create-candidate/create-candidate.component';

export const superAdminRoutes: Routes = [

    {
        path: 'superAdmin', component: SuperAdminComponent, canActivate: [SignInService],
        children: [
            { path: 'dashboard', component: SuperAdminDashboardComponent, pathMatch: 'full'},
            { path: 'adminList', component: AdminListComponent},
            { path: 'adminList/:userName', component: CreateAdminComponent, pathMatch: 'full'},
            { path: 'configuration', component: SuperAdminSettingsComponent},
            { path: 'reports', component: SuperAdminReportsComponent},
            { path: 'candidateList', component: CandidateListComponent},
            { path: 'candidateList/:userName', component: CreateCandidateComponent},
            { path: '**', redirectTo: 'dashboard' },
        ],
    },
    { path: '**', redirectTo: 'superAdmin/dashboard' },
];
export const superAdminRoute: ModuleWithProviders = RouterModule.forRoot(superAdminRoutes);
