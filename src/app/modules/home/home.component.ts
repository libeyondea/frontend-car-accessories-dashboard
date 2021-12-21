import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	page: number = 1;
	limit: number = 5;
	limits: Array<number> = [5, 10, 20, 100];
	total: number = 22;

	constructor() {}

	ngOnInit(): void {}

	onChangePage(page: number): void {
		console.log('page', page);
	}
}
