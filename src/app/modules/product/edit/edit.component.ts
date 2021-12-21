import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Brand } from '~app/shared/models/brand';
import { Category } from '~app/shared/models/category';
import { UpdateProduct } from '~app/shared/models/product';
import { BrandService } from '~app/shared/services/brand.service';
import { CategoryService } from '~app/shared/services/category.service';
import { ProductService } from '~app/shared/services/product.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
	product: any;

	updateProduct: UpdateProduct = new UpdateProduct();
	isLoading: boolean = false;
	fileToUpload: File | null = null;

	id: number = 0;

	updateProductForm = this.fb.group({
		image: [this.updateProduct.image],
		name: [this.updateProduct.name, [Validators.required]],
		slug: [this.updateProduct.slug],
		category: [
			this.updateProduct.category,
			[Validators.required, Validators.min(1)],
		],
		brand: [
			this.updateProduct.brand,
			[Validators.required, Validators.min(1)],
		],
		details: [this.updateProduct.details],
		price: [
			this.updateProduct.price,
			[Validators.required, Validators.min(1)],
		],
		discount: [
			this.updateProduct.discount,
			[Validators.required, Validators.min(1)],
		],
		quantity: [
			this.updateProduct.quantity,
			[Validators.required, Validators.min(1)],
		],
	});

	categories: Category[] = [];
	brands: Brand[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder,
		private productService: ProductService,
		private router: Router,
		private categoryService: CategoryService,
		private brandService: BrandService
	) {
		this.categoryService.list().subscribe((category) => {
			if (category.success) {
				this.categories = category.data;
			}
		});
		this.brandService.list().subscribe((brand) => {
			if (brand.success) {
				this.brands = brand.data;
			}
		});
		this.activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this.productService.show(this.id).subscribe((product) => {
				if (product.success) {
					console.log(product.data);
					this.updateProductForm.patchValue({
						name: product.data.name,
						slug: product.data.slug,
						category: product.data.category.id,
						brand: product.data.brand.id,
						details: product.data.details,
						price: product.data.price,
						discount: product.data.discount,
						quantity: product.data.quantity,
					});
				}
			});
		});
	}

	handleFileInput(event: any) {
		this.fileToUpload = event.target.files.item(0);
	}

	get image() {
		return this.updateProductForm.get('image')!;
	}

	get name() {
		return this.updateProductForm.get('name')!;
	}

	get slug() {
		return this.updateProductForm.get('slug')!;
	}

	get category() {
		return this.updateProductForm.get('category')!;
	}

	get brand() {
		return this.updateProductForm.get('brand')!;
	}

	get details() {
		return this.updateProductForm.get('details')!;
	}

	get price() {
		return this.updateProductForm.get('price')!;
	}

	get discount() {
		return this.updateProductForm.get('discount')!;
	}

	get quantity() {
		return this.updateProductForm.get('quantity')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			image: this.updateProductForm.value.image,
			name: this.updateProductForm.value.name,
			slug: this.updateProductForm.value.slug,
			category: Number(this.updateProductForm.value.category),
			brand: Number(this.updateProductForm.value.brand),
			details: this.updateProductForm.value.details,
			price: Number(this.updateProductForm.value.price),
			discount: Number(this.updateProductForm.value.discount),
			quantity: Number(this.updateProductForm.value.quantity),
		};
		if (
			!payload.name ||
			!payload.category ||
			!payload.brand ||
			!payload.price ||
			!payload.discount ||
			!payload.quantity
		) {
			return;
		}
		payload.image = this.fileToUpload;
		console.log(payload);
		this.isLoading = true;
		this.productService
			.update(this.id, payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((product) => {
				console.log(product);
				this.router.navigate(['/products']);
			});
	}
}
