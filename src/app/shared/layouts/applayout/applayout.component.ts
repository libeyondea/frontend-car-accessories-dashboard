import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '~app/shared/store';
import { selectSidebarApp } from '~app/shared/store/app/app.selectors';

@Component({
	selector: 'app-applayout',
	templateUrl: './applayout.component.html',
	styleUrls: ['./applayout.component.scss'],
})
export class ApplayoutComponent implements OnInit {
	sidebarApp: Observable<any>;
	sidebar: boolean = false;

	constructor(private store: Store<RootState>) {
		this.sidebarApp = this.store.select(selectSidebarApp);
	}

	ngOnInit(): void {
		this.sidebarApp.subscribe((app) => {
			console.log('app', app);
			this.sidebar = app;
		});
	}
}
