import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { BrandService } from '~app/shared/services/brand.service';

@Component({
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
	p: number = 1;
	total: number = 0;
	loading: boolean = false;
	deleting: boolean = false;
	brands: Array<any> = [];
	limit: number = 5;

	constructor(private brandService: BrandService) {}

	ngOnInit(): void {
		this.getPage(1);
	}

	getPage(page: number) {
		this.loading = true;
		this.brandService
			.list(page, this.limit)
			.pipe(finalize(() => (this.loading = false)))
			.subscribe((res) => {
				if (res.success) {
					this.total = res.pagination.total;
					this.p = page;
					this.brands = res.data;
				}
			});
	}

	deleteBrand(id: number): void {
		if (confirm('Are you sure to delete ' + id)) {
			this.deleting = true;
			this.brandService
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
