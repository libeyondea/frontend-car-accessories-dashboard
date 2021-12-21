import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
	{ path: '', component: CategoryComponent },
	{
		path: 'create',
		loadChildren: () =>
			import('./create/create.module').then((m) => m.CreateModule),
	},
	{
		path: 'edit/:id',
		loadChildren: () =>
			import('./edit/edit.module').then((m) => m.EditModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoryRoutingModule {}
