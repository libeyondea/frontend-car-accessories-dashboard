import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Brand } from '~app/shared/models/brand';
import { Category } from '~app/shared/models/category';
import { CreateProduct } from '~app/shared/models/product';
import { BrandService } from '~app/shared/services/brand.service';
import { CategoryService } from '~app/shared/services/category.service';
import { ProductService } from '~app/shared/services/product.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	createProduct: CreateProduct = new CreateProduct();
	isLoading: boolean = false;
	fileToUpload: File | null = null;

	createProductForm = this.fb.group({
		image: [this.createProduct.image, Validators.required],
		name: [this.createProduct.name, [Validators.required]],
		slug: [this.createProduct.slug],
		category: [
			this.createProduct.category,
			[Validators.required, Validators.min(1)],
		],
		brand: [
			this.createProduct.brand,
			[Validators.required, Validators.min(1)],
		],
		details: [this.createProduct.details],
		price: [
			this.createProduct.price,
			[Validators.required, Validators.min(1)],
		],
		discount: [
			this.createProduct.discount,
			[Validators.required, Validators.min(1)],
		],
		quantity: [
			this.createProduct.quantity,
			[Validators.required, Validators.min(1)],
		],
	});

	categories: Category[] = [];
	brands: Brand[] = [];

	constructor(
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
	}

	handleFileInput(event: any) {
		this.fileToUpload = event.target.files.item(0);
	}

	get image() {
		return this.createProductForm.get('image')!;
	}

	get name() {
		return this.createProductForm.get('name')!;
	}

	get slug() {
		return this.createProductForm.get('slug')!;
	}

	get category() {
		return this.createProductForm.get('category')!;
	}

	get brand() {
		return this.createProductForm.get('brand')!;
	}

	get details() {
		return this.createProductForm.get('details')!;
	}

	get price() {
		return this.createProductForm.get('price')!;
	}

	get discount() {
		return this.createProductForm.get('discount')!;
	}

	get quantity() {
		return this.createProductForm.get('quantity')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			image: this.createProductForm.value.image,
			name: this.createProductForm.value.name,
			slug: this.createProductForm.value.slug,
			category: Number(this.createProductForm.value.category),
			brand: Number(this.createProductForm.value.brand),
			details: this.createProductForm.value.details,
			price: Number(this.createProductForm.value.price),
			discount: Number(this.createProductForm.value.discount),
			quantity: Number(this.createProductForm.value.quantity),
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
			.create(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((product) => {
				console.log(product);
				this.router.navigate(['/products']);
			});
	}
}
