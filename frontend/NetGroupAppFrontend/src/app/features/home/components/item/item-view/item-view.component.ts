import { MatTableDataSource } from '@angular/material/table';
import { Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { ItemCreateComponent } from './../item-create/item-create.component';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { ItemService } from 'src/app/core/services/item/item.service';
import { Item } from 'src/app/core/models/item/item.model';

@Component({
	selector: 'app-item-view',
	templateUrl: './item-view.component.html',
	styleUrls: ['./item-view.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
	providers: [UploadService]
})
export class ItemViewComponent implements OnInit {
	@HostBinding('class.item-view') hostCssClass = true;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	columns = [
		{ columnDef: 'id', header: '#', cell: (element: Item) => `# ${element.id}` },
		{ columnDef: 'title', header: 'Title', cell: (element: Item) => `${element.title}` },
		{ columnDef: 'serialNumber', header: 'Serial No.', cell: (element: Item) => `${element.serialNumber}` },
		{ columnDef: 'quantity', header: 'Quantity', cell: (element: Item) => `${element.quantity}` },
		{ columnDef: 'storageId', header: 'Storage', cell: (element: Item) => `${element.storage?.storageSpace}` },
	];

	dataSource = new MatTableDataSource<Item>();
	expandedData!: Item;
	columnsToDisplay: string[] = this.columns.map(c => c.columnDef).concat('actions');

	constructor(
		private service: ItemService,
		private uploadService: UploadService,
		private dialog: MatDialog,
	) {
		console.log("dsa");
	}

	ngOnInit(): void {
		this.getAllItems();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openCreateEditItemDialog(id?: number): void {
		const dialogRef = this.dialog.open(ItemCreateComponent, {
			data: id,
			width: '430px',
			position: { top: "12%" }
		});

		dialogRef.afterClosed().subscribe(
			result => {
				this.getAllItems();
			}
		);
	}

	displayImage(path: string): string {
		return `${this.uploadService.baseUrl}/${path}`;
	}

	removeItem(id: number): void {
		this.service.removeItem(id).subscribe(
			res => {
				this.getAllItems();
			}
		)
	}

	private getAllItems(): void {
		this.service.getItemsList().subscribe(
			data => {
				this.dataSource.data = data;
				this.dataSource.paginator = this.paginator;
			}
		);
	}
}
