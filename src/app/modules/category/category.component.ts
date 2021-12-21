import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CategoryService } from '~app/shared/services/category.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
	p: number = 1;
	total: number = 0;
	loading: boolean = false;
	deleting: boolean = false;
	categories: Array<any> = [];
	limit: number = 5;

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.getPage(1);
	}

	getPage(page: number) {
		this.loading = true;
		this.categoryService
			.list(page, this.limit)
			.pipe(finalize(() => (this.loading = false)))
			.subscribe((res) => {
				if (res.success) {
					this.total = res.pagination.total;
					this.p = page;
					this.categories = res.data;
				}
			});
	}

	deleteCategory(id: number): void {
		if (confirm('Are you sure to delete ' + id)) {
			this.deleting = true;
			this.categoryService
				.delete(id)
				.pipe(finalize(() => (this.deleting = false)))
				.subscribe((res: any) => {
					if (res.success) {
						this.getPage(this.p);
					}
				});
		}
	}
}
