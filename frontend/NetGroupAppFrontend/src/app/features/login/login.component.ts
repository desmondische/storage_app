import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	storages$: Observable<any[]> | undefined;


  	constructor() { }

  	ngOnInit(): void {

  	}

}
