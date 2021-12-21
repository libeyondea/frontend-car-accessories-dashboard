import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '~app/shared/services/auth.service';
import { RootState } from '~app/shared/store';
import { sidebarAppRequested } from '~app/shared/store/app/app.actions';
import { selectSidebarApp } from '~app/shared/store/app/app.selectors';
import { currentAuthRequested } from '~app/shared/store/auth/auth.actions';
import { selectCurrentAuth } from '~app/shared/store/auth/auth.selectors';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	currentAuth: Observable<any>;
	current: any = null;
	sidebarApp: Observable<any>;
	sidebar: boolean = true;

	constructor(
		private store: Store<RootState>,
		private authService: AuthService,
		private cookieService: CookieService
	) {
		this.currentAuth = this.store.select(selectCurrentAuth);
		this.sidebarApp = this.store.select(selectSidebarApp);
	}

	ngOnInit(): void {
		this.sidebarApp.subscribe((app) => {
			console.log('app', app);
			this.sidebar = app;
		});
		this.currentAuth.subscribe((auth) => {
			console.log('auth', auth);
			this.current = auth;
		});
	}

	onlickSidebar() {
		this.store.dispatch(sidebarAppRequested(this.sidebar ? false : true));
	}

	signout() {
		this.authService.signout().subscribe((user) => {
			console.log(user);
		});
		this.store.dispatch(currentAuthRequested(null));
		this.cookieService.delete('access_token');
		window.location.href = '/signin';
	}
}
