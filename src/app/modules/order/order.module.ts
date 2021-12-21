import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '~app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [OrderComponent],
	imports: [
		CommonModule,
		OrderRoutingModule,
		SharedModule,
		NgxPaginationModule,
	],
})
export class OrderModule {}
