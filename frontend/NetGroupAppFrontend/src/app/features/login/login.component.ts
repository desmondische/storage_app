import { StorageService } from 'src/app/core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	storages$: Observable<any[]> | undefined;


  	constructor(private service: StorageService) { }

  	ngOnInit(): void {
		this.storages$ = this.service.getStoragesList();
		console.log(this.storages$.subscribe(response => console.log(response)));
  	}

}
