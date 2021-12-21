import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '~app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [CategoryComponent],
	imports: [
		CommonModule,
		CategoryRoutingModule,
		SharedModule,
		NgxPaginationModule,
	],
})
export class CategoryModule {}
