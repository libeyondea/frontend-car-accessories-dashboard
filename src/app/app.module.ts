import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { rootEffects, rootReducers } from './shared/store';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { ApplayoutComponent } from './shared/layouts/applayout/applayout.component';
import { SidebarComponent } from './shared/layouts/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { ProductService } from './shared/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		SidebarComponent,
		ApplayoutComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		StoreModule.forRoot(rootReducers),
		EffectsModule.forRoot(rootEffects),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		SharedModule,
		NgxPaginationModule,
	],
	providers: [
		AuthService,
		CookieService,
		ProductService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
