import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '~app/shared/store';
import { sidebarAppRequested } from '~app/shared/store/app/app.actions';
import { selectSidebarApp } from '~app/shared/store/app/app.selectors';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	sidebarApp: Observable<any>;
	sidebar: boolean = true;

	constructor(private store: Store<RootState>, private eRef: ElementRef) {
		this.sidebarApp = this.store.select(selectSidebarApp);
	}

	@HostListener('document:mousedown', ['$event'])
	clickout(event: any) {
		console.log('innerWidth', window.innerWidth);
		if (window.innerWidth < 992) {
			if (!this.eRef.nativeElement.contains(event.target)) {
				console.log('outside');
				this.store.dispatch(sidebarAppRequested(false));
			}
		}
	}

	ngOnInit(): void {
		this.sidebarApp.subscribe((app) => {
			this.sidebar = app;
		});
	}
}
