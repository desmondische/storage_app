import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

	readonly baseUrl = "https://localhost:7230";
	readonly requestUrl = `${this.baseUrl}/api/upload`;

	constructor(private http: HttpClient) { }

	uploadFile(formData: FormData): Observable<any> {
		return this.http.post(this.requestUrl, formData, {
			reportProgress: true,
			observe: 'events'
		})
	}
}
