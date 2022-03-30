import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ItemService } from 'src/app/core/services/item/item.service';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { Item } from 'src/app/core/models/item/item.model';

@Component({
	selector: 'app-item-create',
	templateUrl: './item-create.component.html',
	styleUrls: ['./item-create.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ItemCreateComponent implements OnInit {
	@HostBinding('class.item-form') hostCssClass = true;

	response!: { dbPath: ''; };
	storages: Storage[] | undefined;
	item: Item = {
		id: 0,
		title: '',
		serialNumber: 0,
		quantity: 0,
		description: '',
		imagePath: '',
		comments: '',
		storageId: 0,
		createdDate: new Date
	};

	constructor(
		private service: ItemService,
		private storageService: StorageService,
		private dialogRef: MatDialogRef<ItemCreateComponent>
	) { }

	ngOnInit(): void {
		this.getAllStorages();
	}

	onSubmit() {
		this.item = {
			id: 0,
			title: this.item.title,
			serialNumber: this.item.serialNumber,
			quantity: this.item.quantity,
			description: this.item.description,
			imagePath: this.response.dbPath,
			comments: this.item.comments,
			storageId: this.item.storageId,
			createdDate: new Date
		}
		
		this.service.addItem(this.item).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}

	uploadFinished = (event: any) => {
		this.response = event;
		console.log(event);
	}

	private getAllStorages(): void {
		this.storageService.getStoragesList().subscribe(
			data => this.storages = data
		);
	}
}
