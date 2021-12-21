import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TableloadingComponent } from './components/tableloading/tableloading.component';
import { BlockuiComponent } from './components/blockui/blockui.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
	declarations: [
		TableloadingComponent,
		BlockuiComponent,
		BreadcrumbComponent,
	],
	imports: [CommonModule, SharedRoutingModule],
	exports: [TableloadingComponent, BlockuiComponent, BreadcrumbComponent],
})
export class SharedModule {}
