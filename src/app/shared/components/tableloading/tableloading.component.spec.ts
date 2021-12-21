import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableloadingComponent } from './tableloading.component';

describe('TableloadingComponent', () => {
	let component: TableloadingComponent;
	let fixture: ComponentFixture<TableloadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TableloadingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TableloadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
