import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductService } from '~app/shared/services/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	p: number = 1;
	total: number = 0;
	loading: boolean = false;
	deleting: boolean = false;
	products: Array<any> = [];
	limit: number = 5;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.getPage(1);
	}

	getPage(page: number) {
		this.loading = true;
		this.productService
			.list(page, this.limit)
			.pipe(finalize(() => (this.loading = false)))
			.subscribe((products: any) => {
				if (products.success) {
					console.log(products);
					this.total = products.pagination.total;
					this.p = page;
					this.products = products.data;
				}
			});
	}

	deleteProduct(id: number): void {
		if (confirm('Are you sure to delete ' + id)) {
			this.deleting = true;
			this.productService
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
