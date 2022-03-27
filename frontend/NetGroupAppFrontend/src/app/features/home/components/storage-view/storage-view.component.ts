import { StorageFormComponent } from './../storage-form/storage-form.component';
import { StorageService } from 'src/app/core/services/storage.service';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from 'src/app/core/models/storage.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-storage-view',
	templateUrl: './storage-view.component.html',
	styleUrls: ['./storage-view.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class StorageViewComponent implements OnInit {
	@HostBinding('class.storage-view') hostCssClass = true;

	displayedColumns: string[] = ['id', 'space', 'actions'];
	data: Storage[] = [];

	constructor(
		private service: StorageService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.getAllStorages();
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(StorageFormComponent, {
			width: '430px',
		});

		dialogRef.afterClosed().subscribe(
			result => {
				this.getAllStorages();
			}
		);
	}

	removeStorage(id: number): void {
		this.service.removeStorage(id).subscribe(
			res => {
				this.getAllStorages();
			}
		)
	}

	updateStorage(id: number): void { }

	private getAllStorages(): void {
		this.service.getStoragesList().subscribe(
			data => this.data = data
		);
	}
}
