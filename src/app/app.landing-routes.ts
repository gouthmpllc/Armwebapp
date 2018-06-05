import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/common/landing-pages/home/home.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';

export const armyHomeRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'about', redirectTo: 'about', pathMatch: 'full' },
    // { path: 'contact', redirectTo: 'contact', pathMatch: 'full' },
    // { path: 'login', redirectTo: 'login', pathMatch: 'full' },

    { path: 'home', component: HomeComponent},
    // { path: 'about', component: },
    // { path: 'contact', component: },
    { path: 'login', component: SignInComponent, pathMatch: 'full'},
    // { path: '**', redirectTo: '' , component: HomeComponent},
];

export const armyHomeRouter: ModuleWithProviders = RouterModule.forRoot(armyHomeRoutes);
