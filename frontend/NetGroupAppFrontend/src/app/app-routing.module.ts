import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { AccountComponent } from './features/account/account.component';

const routes: Routes = [
    {
        path: 'account',
        component: AccountComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
		canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
