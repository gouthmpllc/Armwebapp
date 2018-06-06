import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInService } from './services/signIn-service/sign-in.service';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CandidateListComponent } from './components/admin/candidate-list/candidate-list.component';
import { CreateCandidateComponent } from './components/admin/candidate-list/create-candidate/create-candidate.component';
import { SuperAdminReportsComponent } from './components/super-admin/super-admin-reports/super-admin-reports.component';
import { SuperAdminDashboardComponent } from './components/super-admin/super-admin-dashboard/super-admin-dashboard.component';


export const adminRoutes: Routes = [

    {
        path: 'admin', component: AdminComponent, canActivate: [SignInService],
        children: [
            // { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'dashboard', component: SuperAdminDashboardComponent },
            { path: 'candidateList', component: CandidateListComponent},
            { path: 'candidateList/:userName', component: CreateCandidateComponent},
            { path: 'reports', component: SuperAdminReportsComponent},
            // { path: 'configuration', component: SuperAdminSettingsComponent},
            // { path: 'reports', component: SuperAdminReportsComponent},
            { path: '**', redirectTo: 'dashboard' },
        ],
    }
];
export const adminRoute: ModuleWithProviders = RouterModule.forRoot(adminRoutes);
