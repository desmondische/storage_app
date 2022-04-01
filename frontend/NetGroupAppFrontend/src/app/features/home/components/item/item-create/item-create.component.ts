import { Component, HostBinding, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ItemService } from 'src/app/core/services/item/item.service';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { Item } from 'src/app/core/models/item/item.model';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-item-create',
	templateUrl: './item-create.component.html',
	styleUrls: ['./item-create.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ItemCreateComponent implements OnInit {
	@HostBinding('class.item-form') hostCssClass = true;

	showWarning$ = new BehaviorSubject(false);
	storages!: Storage[];
	response!: { dbPath: '' };
	item: Item = {
		id: 0,
		title: '',
		description: '',
		imagePath: '',
		storageId: 0,
	};

	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private service: ItemService,
		private storageService: StorageService,
		private dialogRef: MatDialogRef<ItemCreateComponent>,
		@Inject(MAT_DIALOG_DATA) private data: number
	) {
		this.form = this.fb.group({
			title: ['', Validators.required],
			serialNumber: ['', Validators.required],
			quantity: ['', Validators.required],
			description: ['', Validators.required],
			comments: [''],
			storageId: ['', Validators.required],
		});
	}

	get f() { return this.form.controls; }

	ngOnInit(): void {
		this.getItem();
		this.getAllStorages();
	}

	onSubmit() {
		if (this.response) {
			this.item = {
				id: this.item.id,
				userId: this.item.userId,
				title: this.f['title'].value,
				serialNumber: this.f['serialNumber'].value,
				quantity: this.f['quantity'].value,
				description: this.f['description'].value,
				imagePath: this.response.dbPath,
				comments: this.f['comments'].value,
				storageId: this.f['storageId'].value,
				createdDate: new Date
			}

			if (this.item.id == 0) this.addItem();
			else this.updateItem();
		}

		else this.showWarning$.next(true);
	}

	uploadFinished = (event: any) => {
		this.response = event;
		console.log(event);

		this.showWarning$.next(false);
	}

	private getAllStorages(): void {
		this.storageService.getStoragesList().subscribe(
			data => this.storages = data
		);
	}

	private getItem(): void {
		if (this.data) {
			this.service.getItem(this.data).subscribe(
				data => this.item = data
			);
		}
	}

	private addItem(): void {
		this.service.addItem(this.item).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}

	private updateItem(): void {
		this.service.updateItem(this.item.id, this.item).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}
}
