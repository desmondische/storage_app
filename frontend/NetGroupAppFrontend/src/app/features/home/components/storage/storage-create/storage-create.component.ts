import { StorageService } from 'src/app/core/services/storage/storage.service';
import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-storage-create',
    templateUrl: './storage-create.component.html',
    styleUrls: ['./storage-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StorageCreateComponent implements OnInit {
    @HostBinding('class.storage-form') hostCssClass = true;

	storage: Storage | undefined;
    storageForm: FormGroup;

    constructor(
			private fb: FormBuilder,
			private service: StorageService,
			private dialogRef: MatDialogRef<StorageCreateComponent>
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

    ngOnInit(): void { }

    addStorageLevel() {
        this.storageSpace.push(this.newStorageLevel);
    }

    removeStorageLevel(i: number) {
        this.storageSpace.removeAt(i);
    }

    onSubmit() {

		let storageLevels: string[] = 
			this.storageSpace.value.map((i:any) => i.storage_level);

		this.storage = {
			id: 0,
			storageSpace: storageLevels.join('/'),
			createdDate: new Date,
			items: []
		}

		this.service.addStorage(this.storage).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
    }
}
