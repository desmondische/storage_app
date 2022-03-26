import { StorageService } from 'src/app/core/services/storage.service';
import { Observable } from 'rxjs';
import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-storage-form',
    templateUrl: './storage-form.component.html',
    styleUrls: ['./storage-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StorageFormComponent implements OnInit {
    @HostBinding('class.storage-form') hostCssClass = true;

	storages$: Observable<any[]> | undefined;
    storageForm: FormGroup;
	storage: any;

    constructor(
			private fb: FormBuilder,
			private service: StorageService
	) {
        this.storageForm = this.fb.group({
            storage_space: this.fb.array([
				this.fb.group({
					storage_level: '',
				}),
				this.fb.group({
					storage_level: '',
				})
			]),
        });
    }

    ngOnInit(): void {
		this.storages$ = this.service.getStoragesList();
		console.log(this.storages$.subscribe(response => console.log(response)));
	}

    get storageSpace(): FormArray {
        return this.storageForm.get('storage_space') as FormArray;
    }

    newStorageLevel(): FormGroup {
        return this.fb.group({
            storage_level: '',
        });
    }

    addStorageLevel() {
        this.storageSpace.push(this.newStorageLevel());
    }

    removeStorageLevel(i: number) {
        this.storageSpace.removeAt(i);
    }

    onSubmit() {
		var storage = {
			id: 0,
			space: "test3"
		}
        console.log(this.storageForm.value);

		this.service.addStorage(storage).subscribe(
			data => console.log('success', data)
		);
    }
}
