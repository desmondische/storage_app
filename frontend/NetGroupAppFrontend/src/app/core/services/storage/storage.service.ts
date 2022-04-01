import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '../../models/storage/storage.model';
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
	.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))

@Injectable()
export class StorageService {

	constructor(private http: HttpClient) { }

	getStoragesList(): Observable<Storage[]> {
		return this.http.get<Storage[]>(`${environment.apiUrl}/storages/`,
			{
				headers: headers
			}
		);
	}

	getStorage(id: number): Observable<Storage> {
		return this.http.get<Storage>(`${environment.apiUrl}/storages/` + id,
			{
				headers: headers
			}
		);
	}

	addStorage(data: Storage): Observable<Storage> {
		return this.http.post<Storage>(`${environment.apiUrl}/storages/`, data,
			{
				headers: headers
			}
		);
	}

	updateStorage(id: number, data: Storage): Observable<Storage> {
		return this.http.put<Storage>(`${environment.apiUrl}/storages/` + id, data,
			{
				headers: headers
			}
		);;
	}

	removeStorage(id: number): Observable<Storage> {
		return this.http.delete<Storage>(`${environment.apiUrl}/storages/` + id,
			{
				headers: headers
			}
		);;
	}

}
