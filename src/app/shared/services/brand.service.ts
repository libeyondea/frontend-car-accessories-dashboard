import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { CreateBrand, UpdateBrand } from '../models/brand';

@Injectable({
	providedIn: 'root',
})
export class BrandService {
	constructor(private httpClient: HttpClient) {}

	list(page: number = 1, pageSize: number = 10): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/brands?page=${page}&page_size=${pageSize}`
		);
	}

	show(id: number): Observable<any> {
		return this.httpClient.get<any>(`${environment.API_URL}/brands/${id}`);
	}

	create(createBrand: CreateBrand): Observable<any> {
		const url = `${environment.API_URL}/brands`;
		return this.httpClient.post<CreateBrand>(url, createBrand);
	}

	update(id: number, updateBrand: UpdateBrand): Observable<any> {
		const url = `${environment.API_URL}/brands/${id}`;
		return this.httpClient.put<UpdateBrand>(url, updateBrand);
	}

	delete(id: number): Observable<any> {
		const url = `${environment.API_URL}/brands/${id}`;
		return this.httpClient.delete<any>(url);
	}
}
