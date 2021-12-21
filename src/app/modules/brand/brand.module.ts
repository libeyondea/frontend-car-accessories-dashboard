import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { SharedModule } from '~app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [BrandComponent],
	imports: [
		CommonModule,
		BrandRoutingModule,
		SharedModule,
		NgxPaginationModule,
	],
})
export class BrandModule {}
