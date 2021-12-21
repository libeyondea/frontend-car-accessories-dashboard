import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplayoutComponent } from './applayout.component';

describe('ApplayoutComponent', () => {
	let component: ApplayoutComponent;
	let fixture: ComponentFixture<ApplayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ApplayoutComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ApplayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
