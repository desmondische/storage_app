import { ItemCreateComponent } from './../item-create/item-create.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from './../../../../../core/services/item/item.service';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from 'src/app/core/models/item/item.model';

@Component({
	selector: 'app-item-view',
	templateUrl: './item-view.component.html',
	styleUrls: ['./item-view.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ItemViewComponent implements OnInit {
	@HostBinding('class.item-view') hostCssClass = true;

	columns = [
		{ columnDef: 'id', header: '#', cell: (element: Item) => `# ${element.id}` },
		{ columnDef: 'title', header: 'Title', cell: (element: Item) => `${element.title}` },
		{ columnDef: 'serialNumber', header: 'Serial No.', cell: (element: Item) => `${element.serialNumber}` },
		{ columnDef: 'quantity', header: 'Quantity', cell: (element: Item) => `${element.quantity}` },
		{ columnDef: 'description', header: 'Description', cell: (element: Item) => `${element.description}` },
		// { columnDef: 'image', header: 'Image', cell: (element: Item) => `${element.image}` },
		{ columnDef: 'comments', header: 'Comments', cell: (element: Item) => `${element.comments}` },
		{ columnDef: 'storageId', header: 'Storage', cell: (element: Item) => `${element.storage?.storageSpace}` },
		// { columnDef: 'createdDate', header: 'Created Date', cell: (element: Item) => `${element.createdDate}` },
	];

	columnsToDisplay: string[] = this.columns.map(c => c.columnDef);
	dataSource: Item[] = [];

	constructor(
			private service: ItemService,
			private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.getAllItems();
	}

	openCreateItemDialog(): void {
		const dialogRef = this.dialog.open(ItemCreateComponent, {
			width: '430px',
		});

		dialogRef.afterClosed().subscribe(
			result => {
				this.getAllItems();
			}
		);
	}

	removeItem(id: number): void {}

	private getAllItems(): void {
		this.service.getItemsList().subscribe(
			data => this.dataSource = data
		);
	}
}
