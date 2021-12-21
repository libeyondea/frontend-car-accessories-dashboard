import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '~app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [ProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		SharedModule,
		NgxPaginationModule,
	],
})
export class ProductModule {}
