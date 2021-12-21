import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private httpClient: HttpClient) {}

	list(page: number = 1, pageSize: number = 10): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/orders?page=${page}&page_size=${pageSize}`
		);
	}
}
