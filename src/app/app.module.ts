import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserService } from './user/user.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthenticationComponent,
    ],
    providers: [appInterceptorProvider, UserService,
        {
            //With this your app will wait to resolve the promise of init() of your UserAuthService.
            provide: APP_INITIALIZER,
            useFactory: (service: UserService) => function () { return service.init(); },
            deps: [UserService],
            multi: true
        }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        AppRoutingModule
    ]
})
export class AppModule { }
