import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../models/storage/storage.model';

@Injectable()
export class StorageService {

	readonly requestUrl = "https://localhost:7230/api/storages/";

	constructor(private http: HttpClient) { }

	getStoragesList(): Observable<Storage[]> {
		return this.http.get<Storage[]>(this.requestUrl);
	}

	addStorage(data: Storage): Observable<Storage> {
		return this.http.post<Storage>(this.requestUrl, data);
	}

	removeStorage(id: number): Observable<Storage> {
		return this.http.delete<Storage>(this.requestUrl + id);
	}

}
