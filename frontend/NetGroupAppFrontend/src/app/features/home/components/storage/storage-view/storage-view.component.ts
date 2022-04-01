import { StorageDetailsComponent } from './../storage-details/storage-details.component';
import { Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { StorageCreateComponent } from '../storage-create/storage-create.component';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Storage } from 'src/app/core/models/storage/storage.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-storage-view',
	templateUrl: './storage-view.component.html',
	styleUrls: ['./storage-view.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class StorageViewComponent implements OnInit {
	@HostBinding('class.storage-view') hostCssClass = true;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	columns = [
		{ columnDef: 'id', header: '#', cell: (element: Storage) => `# ${element.id}` },
		{ columnDef: 'storageSpace', header: 'Title', cell: (element: Storage) => `${element.storageSpace}` },
		{ columnDef: 'items', header: 'Items', cell: (element: Storage) => `${element.items?.length}` },
		{ columnDef: 'createdDate', header: 'Created Date', cell: (element: Storage) => `${element.createdDate}` }
	];

	dataSource = new MatTableDataSource<Storage>();
	columnsToDisplay: string[] = [];

	constructor(
		private service: StorageService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.getAllStorages();
		this.columnsToDisplay = this.columns.map(c => c.columnDef).concat('actions');
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// not clean
	openCreateEditStorageDialog(id?: number): void {
		const dialogRef = this.dialog.open(StorageCreateComponent, {
			data: id,
			width: '420px',
			position: { top: "12%" }
		});

		dialogRef.afterClosed().subscribe(
			result => {
				this.getAllStorages();
			}
		);
	}

	// not clean
	openStorageDetailsDialog(id: number): void {
		const dialogRef = this.dialog.open(StorageDetailsComponent, {
			data: id,
			width: '600px',
			position: { top: "12%" }
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

	private getAllStorages(): void {
		this.service.getStoragesList().subscribe(
			data => {
				this.dataSource.data = data;
				this.dataSource.paginator = this.paginator;
			}
		)
	}
}
