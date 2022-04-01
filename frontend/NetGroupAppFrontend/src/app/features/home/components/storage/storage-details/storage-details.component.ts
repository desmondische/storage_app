import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Component, HostBinding, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Storage } from 'src/app/core/models/storage/storage.model';

@Component({
	selector: 'app-storage-details',
	templateUrl: './storage-details.component.html',
	styleUrls: ['./storage-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class StorageDetailsComponent implements OnInit {
	@HostBinding('class.storage-details') hostCssClass = true;

	hidden = true;
	storage: Storage = {
		id: 0,
		storageSpace: ''
	};

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: number,
		private service: StorageService
	) { }

	ngOnInit(): void {
		this.getStorage();
	}

	private getStorage(): void {
		if (this.data) {
			this.service.getStorage(this.data).subscribe(
				data => {
					this.storage = data
				}
			);
		}
	}
}
