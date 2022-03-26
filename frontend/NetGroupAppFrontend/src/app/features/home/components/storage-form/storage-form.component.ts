import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-storage-form',
    templateUrl: './storage-form.component.html',
    styleUrls: ['./storage-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StorageFormComponent implements OnInit {
    @HostBinding('class.storage-form') hostCssClass = true;

    storageForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.storageForm = this.fb.group({
            storage_levels: this.fb.array([
				this.fb.group({
					storage_space: '',
				}),
				this.fb.group({
					storage_space: '',
				})
			]),
        });
    }

    ngOnInit(): void {}

    get storageLevels(): FormArray {
        return this.storageForm.get('storage_levels') as FormArray;
    }

    newStorageLevel(): FormGroup {
        return this.fb.group({
            storage_space: '',
        });
    }

    addStorageLevel() {
        this.storageLevels.push(this.newStorageLevel());
    }

    removeStorageLevel(i: number) {
        this.storageLevels.removeAt(i);
    }

    onSubmit() {
        console.log(this.storageForm.value);
    }
}
