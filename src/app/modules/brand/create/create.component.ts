import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CreateBrand } from '~app/shared/models/brand';
import { BrandService } from '~app/shared/services/brand.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	createBrand: CreateBrand = new CreateBrand();
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private brandService: BrandService
	) {}

	createBrandForm = this.fb.group({
		name: [this.createBrand.name, [Validators.required]],
		slug: [this.createBrand.slug],
	});

	get name() {
		return this.createBrandForm.get('name')!;
	}

	get slug() {
		return this.createBrandForm.get('slug')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			name: this.createBrandForm.value.name,
			slug: this.createBrandForm.value.slug,
		};
		if (!payload.name) {
			return;
		}
		console.log(payload);
		this.isLoading = true;
		this.brandService
			.create(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((res) => {
				console.log(res);
				this.router.navigate(['/brands']);
			});
	}
}
