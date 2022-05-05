import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../../models/item/item.model';

const headers = new HttpHeaders()
	.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))

@Injectable()
export class ItemService {

	constructor(private http: HttpClient) {
		console.log("asd");
	}

	getItemsList(): Observable<Item[]> {
		return this.http.get<Item[]>(`${environment.apiUrl}/items/`,
			{
				headers: headers
			}
		);
	}

	getItem(id: number): Observable<Item> {
		return this.http.get<Item>(`${environment.apiUrl}/items/` + id,
			{
				headers: headers
			}
		);
	}

	addItem(data: Item): Observable<Item> {
		return this.http.post<Item>(`${environment.apiUrl}/items/`, data,
			{
				headers: headers
			}
		);
	}

	updateItem(id: number, data: Item): Observable<Item> {
		return this.http.put<Item>(`${environment.apiUrl}/items/` + id, data,
			{
				headers: headers
			}
		);
	}

	removeItem(id: number): Observable<Item> {
		return this.http.delete<Item>(`${environment.apiUrl}/items/` + id,
			{
				headers: headers
			}
		);
	}
}
