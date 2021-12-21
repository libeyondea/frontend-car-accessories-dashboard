import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { CreateProduct, UpdateProduct } from '../models/product';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private httpClient: HttpClient) {}

	list(
		page: number = 1,
		pageSize: number = 10,
		sortBy?: string,
		sortDirection?: string,
		q?: string
	): Observable<any> {
		return this.httpClient.get<any>(
			`${
				environment.API_URL
			}/products?page=${page}&page_size=${pageSize}${
				sortBy ? `&sort_by=${sortBy}` : ''
			}
			${sortDirection ? `&sort_direction=${sortDirection}` : ''}
			${q ? `&q=${q}` : ''}`
		);
	}

	show(id: number): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/products/${id}`
		);
	}

	create(createProduct: CreateProduct): Observable<any> {
		const formData: FormData = new FormData();

		if (createProduct.image) {
			formData.append(
				'image',
				createProduct.image,
				createProduct.image.name
			);
		}
		formData.append('name', createProduct.name);
		formData.append('slug', createProduct.slug);
		formData.append('category', createProduct.category.toString());
		formData.append('brand', createProduct.brand.toString());
		formData.append('details', createProduct.details);
		formData.append('price', createProduct.price.toString());
		formData.append('discount', createProduct.discount.toString());
		formData.append('quantity', createProduct.quantity.toString());

		const url = `${environment.API_URL}/products`;
		return this.httpClient.post<CreateProduct>(url, formData);
	}

	update(id: number, updateProduct: UpdateProduct): Observable<any> {
		const formData: FormData = new FormData();

		if (updateProduct.image) {
			formData.append(
				'image',
				updateProduct.image,
				updateProduct.image.name
			);
		}
		formData.append('name', updateProduct.name);
		formData.append('slug', updateProduct.slug);
		formData.append('category', updateProduct.category.toString());
		formData.append('brand', updateProduct.brand.toString());
		formData.append('details', updateProduct.details);
		formData.append('price', updateProduct.price.toString());
		formData.append('discount', updateProduct.discount.toString());
		formData.append('quantity', updateProduct.quantity.toString());
		formData.append('_method', 'PUT');
		const url = `${environment.API_URL}/products/${id}`;
		return this.httpClient.post<UpdateProduct>(url, formData);
	}

	delete(id: number): Observable<any> {
		return this.httpClient.delete<any>(
			`${environment.API_URL}/products/${id}`
		);
	}
}
