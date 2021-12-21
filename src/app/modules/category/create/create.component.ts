import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CreateCategory } from '~app/shared/models/category';
import { CategoryService } from '~app/shared/services/category.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	createCategory: CreateCategory = new CreateCategory();
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private categoryService: CategoryService
	) {}

	createCategoryForm = this.fb.group({
		name: [this.createCategory.name, [Validators.required]],
		slug: [this.createCategory.slug],
	});

	get name() {
		return this.createCategoryForm.get('name')!;
	}

	get slug() {
		return this.createCategoryForm.get('slug')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			name: this.createCategoryForm.value.name,
			slug: this.createCategoryForm.value.slug,
		};
		if (!payload.name) {
			return;
		}
		console.log(payload);
		this.isLoading = true;
		this.categoryService
			.create(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((res) => {
				console.log(res);
				this.router.navigate(['/categories']);
			});
	}
}
