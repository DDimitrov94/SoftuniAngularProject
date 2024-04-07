import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { GuestGuard } from "../guards/guest-guard.guard";
import { AuthGuard } from "../guards/auth-guard.guard";

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[GuestGuard]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}