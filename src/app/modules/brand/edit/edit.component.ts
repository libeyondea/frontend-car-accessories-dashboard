import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UpdateBrand } from '~app/shared/models/brand';
import { BrandService } from '~app/shared/services/brand.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
	updateBrand: UpdateBrand = new UpdateBrand();
	isLoading: boolean = false;
	id: number = 0;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private brandService: BrandService,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this.brandService.show(this.id).subscribe((res) => {
				if (res.success) {
					console.log(res.data);
					this.updateBrandForm.patchValue({
						name: res.data.name,
						slug: res.data.slug,
					});
				}
			});
		});
	}

	updateBrandForm = this.fb.group({
		name: [this.updateBrand.name, [Validators.required]],
		slug: [this.updateBrand.slug],
	});

	get name() {
		return this.updateBrandForm.get('name')!;
	}

	get slug() {
		return this.updateBrandForm.get('slug')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			name: this.updateBrandForm.value.name,
			slug: this.updateBrandForm.value.slug,
		};
		if (!payload.name) {
			return;
		}
		console.log(payload);
		this.isLoading = true;
		this.brandService
			.update(this.id, payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((res) => {
				console.log(res);
				this.router.navigate(['/brands']);
			});
	}
}
