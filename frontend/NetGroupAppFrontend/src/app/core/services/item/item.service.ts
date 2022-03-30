import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/item/item.model';

@Injectable()
export class ItemService {

	readonly requestUrl = "https://localhost:7230/api/items/";

	constructor(private http: HttpClient) { }

	getItemsList(): Observable<Item[]> {
		return this.http.get<Item[]>(this.requestUrl);
	}

	addItem(data: Item): Observable<Item> {
		return this.http.post<Item>(this.requestUrl, data);
	}

	removeItem(id: number): Observable<Item> {
		return this.http.delete<Item>(this.requestUrl + id);
	}
}
