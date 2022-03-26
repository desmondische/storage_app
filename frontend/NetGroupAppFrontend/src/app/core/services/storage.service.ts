import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	readonly requestUrl = "https://localhost:7230/api";


  	constructor(private http: HttpClient) { }

	getStoragesList(): Observable<any> {
		return this.http.get<any>(this.requestUrl + '/storages');
	}

	addStorage(data: any) {
		return this.http.post(this.requestUrl + '/storages', data);
	} 
}
