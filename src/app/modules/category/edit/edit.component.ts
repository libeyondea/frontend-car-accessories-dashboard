import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UpdateCategory } from '~app/shared/models/category';
import { CategoryService } from '~app/shared/services/category.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
	updateCategory: UpdateCategory = new UpdateCategory();
	isLoading: boolean = false;
	id: number = 0;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private categoryService: CategoryService,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this.categoryService.show(this.id).subscribe((res) => {
				if (res.success) {
					console.log(res.data);
					this.updateCategoryForm.patchValue({
						name: res.data.name,
						slug: res.data.slug,
					});
				}
			});
		});
	}

	updateCategoryForm = this.fb.group({
		name: [this.updateCategory.name, [Validators.required]],
		slug: [this.updateCategory.slug],
	});

	get name() {
		return this.updateCategoryForm.get('name')!;
	}

	get slug() {
		return this.updateCategoryForm.get('slug')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			name: this.updateCategoryForm.value.name,
			slug: this.updateCategoryForm.value.slug,
		};
		if (!payload.name) {
			return;
		}
		console.log(payload);
		this.isLoading = true;
		this.categoryService
			.update(this.id, payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((res) => {
				console.log(res);
				this.router.navigate(['/categories']);
			});
	}
}
