import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OrderService } from '~app/shared/services/order.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
	p: number = 1;
	total: number = 0;
	loading: boolean = false;
	orders: Array<any> = [];
	limit: number = 5;

	constructor(private orderService: OrderService) {}

	ngOnInit(): void {
		this.getPage(1);
	}

	getPage(page: number) {
		this.loading = true;
		this.orderService
			.list(page, this.limit)
			.pipe(finalize(() => (this.loading = false)))
			.subscribe((res) => {
				if (res.success) {
					console.log(res);
					this.total = res.pagination.total;
					this.p = page;
					this.orders = res.data;
				}
			});
	}

	totalPriceOrder(items: Array<any>): number {
		return items.reduce(function (a, b) {
			return Number(a) + Number(b['price']);
		}, 0);
	}
}
