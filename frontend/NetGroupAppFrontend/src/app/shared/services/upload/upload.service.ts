import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UploadService {

	readonly baseUrl = "https://localhost:7230";

	constructor(private http: HttpClient) { }

	uploadFile(formData: FormData): Observable<any> {
		return this.http.post(`${environment.apiUrl}/upload/`, formData, {
			reportProgress: true,
			observe: 'events'
		})
	}
}
