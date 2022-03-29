import { StorageCreateComponent } from '../storage-create/storage-create.component';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { MatDialog } from '@angular/material/dialog';
import { StorageDetailsComponent } from '../storage-details/storage-details.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-storage-view',
	templateUrl: './storage-view.component.html',
	styleUrls: ['./storage-view.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class StorageViewComponent implements OnInit {
	@HostBinding('class.storage-view') hostCssClass = true;

	columns = [
		{ columnDef: 'id', header: '#', cell: (element: Storage) => `# ${element.id}` },
		{ columnDef: 'storageSpace', header: 'Title', cell: (element: Storage) => `${element.storageSpace}` },
		{ columnDef: 'items', header: 'Items', cell: (element: Storage) => `${element.items.length}` },
		{ columnDef: 'createdDate', header: 'Created Date', cell: (element: Storage) => `${element.createdDate}` }
	];

	dataSource: Storage[] = [];
	expandedData: Storage[] | undefined;
	columnsToDisplay: string[] = this.columns.map(c => c.columnDef).concat('actions');

	constructor(
		private service: StorageService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.getAllStorages();
		console.log();
	}

	openCreateStorageDialog(): void {
		const dialogRef = this.dialog.open(StorageCreateComponent, {
			width: '430px',
		});

		dialogRef.afterClosed().subscribe(
			result => {
				this.getAllStorages();
			}
		);
	}

	openEditDialog(): void { }

	removeStorage(id: number): void {
		this.service.removeStorage(id).subscribe(
			res => {
				this.getAllStorages();
			}
		)
	}

	private getAllStorages(): void {
		this.service.getStoragesList().subscribe(
			data => this.dataSource = data
		);
	}
}
