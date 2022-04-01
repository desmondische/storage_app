import { UserModel } from './../../models/auth/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

	constructor(
		private http: HttpClient
	) { }

	register(user: UserModel): Observable<UserModel> {
		return this.http.post<UserModel>(`${environment.apiUrl}/auth/register`, user);
	}

	login(user: UserModel): Observable<UserModel> {
		return this.http.post<UserModel>(`${environment.apiUrl}/auth/login`, user);
	}
}
