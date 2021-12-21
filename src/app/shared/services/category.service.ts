import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { CreateCategory, UpdateCategory } from '../models/category';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor(private httpClient: HttpClient) {}

	list(page: number = 1, pageSize: number = 10): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/categories?page=${page}&page_size=${pageSize}`
		);
	}

	show(id: number): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/categories/${id}`
		);
	}

	create(createCategory: CreateCategory): Observable<any> {
		const url = `${environment.API_URL}/categories`;
		return this.httpClient.post<CreateCategory>(url, createCategory);
	}

	update(id: number, updateCategory: UpdateCategory): Observable<any> {
		const url = `${environment.API_URL}/categories/${id}`;
		return this.httpClient.put<UpdateCategory>(url, updateCategory);
	}

	delete(id: number): Observable<any> {
		const url = `${environment.API_URL}/categories/${id}`;
		return this.httpClient.delete<any>(url);
	}
}
