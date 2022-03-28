import { StorageService } from './../../core/services/storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home.component';
import { StorageFormComponent } from './components/storage/storage-form/storage-form.component';
import { StorageViewComponent } from './components/storage/storage-view/storage-view.component';
import { ItemViewComponent } from './components/item/item-view/item-view.component';

@NgModule({
	declarations: [HomeComponent, StorageFormComponent, StorageViewComponent, ItemViewComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		MatTabsModule
	],
	exports: [],
	providers: [StorageService]
})
export class HomeModule { }
