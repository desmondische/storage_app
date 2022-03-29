import { ItemService } from './../../../../../core/services/item/item.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Component, HostBinding, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { Item } from 'src/app/core/models/item/item.model';

@Component({
	selector: 'app-item-create',
	templateUrl: './item-create.component.html',
	styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
	@HostBinding('class.item-form') hostCssClass = true;

	item: Item = {
		id: 0,
		title: '',
		serialNumber: 0,
		quantity: 0,
		description: '',
		image: '',
		comments: '',
		storageId: 0,
		createdDate: new Date
	};

	storages: Storage[] | undefined;

	constructor(
		private service: ItemService,
		private storageService: StorageService,
		private dialogRef: MatDialogRef<ItemCreateComponent>
	) { }

	ngOnInit(): void {
		this.getAllStorages();
	}

	onSubmit() {

		this.service.addItem(this.item).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}

	private getAllStorages(): void {
		this.storageService.getStoragesList().subscribe(
			data => this.storages = data
		);
	}
}
