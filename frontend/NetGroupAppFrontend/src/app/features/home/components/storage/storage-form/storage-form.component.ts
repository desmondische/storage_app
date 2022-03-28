import { StorageService } from 'src/app/core/services/storage.service';
import { Observable } from 'rxjs';
import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Storage } from 'src/app/core/models/storage.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-storage-form',
    templateUrl: './storage-form.component.html',
    styleUrls: ['./storage-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StorageFormComponent implements OnInit {
    @HostBinding('class.storage-form') hostCssClass = true;

	storage: Storage | undefined;
    storageForm: FormGroup;

    constructor(
			private fb: FormBuilder,
			private service: StorageService,
			private dialogRef: MatDialogRef<StorageFormComponent>
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
			space: storageLevels.join('/')
		}

		this.service.addStorage(this.storage).subscribe(
			data => {
				this.dialogRef.close('closed');
				console.log(data);
			}
		)
    }
}
