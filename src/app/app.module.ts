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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
        },
        ToastrService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpClientModule,

        AppRoutingModule
    ]
})
export class AppModule { }
