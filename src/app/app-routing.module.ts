import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { ApplayoutComponent } from './shared/layouts/applayout/applayout.component';

const routes: Routes = [
	{
		path: 'signin',
		loadChildren: () =>
			import('./modules/signin/signin.module').then(
				(m) => m.SigninModule
			),
	},
	{
		path: '',
		component: ApplayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./modules/home/home.module').then(
						(m) => m.HomeModule
					),
			},
			{
				path: 'products',
				loadChildren: () =>
					import('./modules/product/product.module').then(
						(m) => m.ProductModule
					),
			},
			{
				path: 'categories',
				loadChildren: () =>
					import('./modules/category/category.module').then(
						(m) => m.CategoryModule
					),
			},
			{
				path: 'brands',
				loadChildren: () =>
					import('./modules/brand/brand.module').then(
						(m) => m.BrandModule
					),
			},
			{
				path: 'orders',
				loadChildren: () =>
					import('./modules/order/order.module').then(
						(m) => m.OrderModule
					),
			},
		],
	},

	{ path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
