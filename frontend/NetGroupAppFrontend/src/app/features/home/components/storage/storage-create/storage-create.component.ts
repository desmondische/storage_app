import {
	Component,
	HostBinding,
	Inject,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Storage } from 'src/app/core/models/storage/storage.model';

@Component({
	selector: 'app-storage-create',
	templateUrl: './storage-create.component.html',
	styleUrls: ['./storage-create.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class StorageCreateComponent implements OnInit {
	@HostBinding('class.storage-form') hostCssClass = true;

	storageForm: FormGroup;
	storage: Storage = {
		id: 0,
		storageSpace: ''
	};

	constructor(
		private fb: FormBuilder,
		private service: StorageService,
		private dialogRef: MatDialogRef<StorageCreateComponent>,
		@Inject(MAT_DIALOG_DATA) private data: number
	) {
		this.storageForm = this.fb.group({
			storage_space: this.fb.array([
				this.newStorageLevel,
				this.newStorageLevel
			]),
		});
	}

	get storageSpace(): FormArray {
		return this.storageForm.get('storage_space') as FormArray;
	}

	get newStorageLevel(): FormGroup {
		return this.fb.group({
			storage_level: '',
		});
	}

	ngOnInit(): void {
		this.getStorage();
	}

	addStorageLevel() {
		this.storageSpace.push(this.newStorageLevel);
	}

	removeStorageLevel(i: number) {
		this.storageSpace.removeAt(i);
	}

	onSubmit() {
		if (!this.storageForm.valid) {
			return;
		}

		let storageLevels: string[] =
			this.storageSpace.value.map((i: any) => i.storage_level);

		this.storage = {
			id: this.storage.id,
			userId: this.storage.userId,
			storageSpace: storageLevels.join('/').slice(0, -1),
			createdDate: new Date,
			items: this.storage.items
		}

		if (this.storage.id == 0) 
			this.addStorage();

		else this.updateStorage();
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

	private addStorage(): void {
		this.service.addStorage(this.storage).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}

	private updateStorage(): void {
		this.service.updateStorage(this.storage.id, this.storage).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
	}
}
