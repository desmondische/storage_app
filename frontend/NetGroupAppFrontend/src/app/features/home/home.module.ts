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
import { MatSelectModule } from '@angular/material/select';

import { HomeComponent } from './home.component';
import { StorageCreateComponent } from './components/storage/storage-create/storage-create.component';
import { StorageViewComponent } from './components/storage/storage-view/storage-view.component';
import { ItemViewComponent } from './components/item/item-view/item-view.component';
import { StorageDetailsComponent } from './components/storage/storage-details/storage-details.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { UploadComponent } from 'src/app/shared/components/upload/upload.component';

@NgModule({
	declarations: [
		HomeComponent,
		StorageCreateComponent,
		StorageViewComponent,
		ItemViewComponent,
		StorageDetailsComponent, 
		ItemCreateComponent, 
		UploadComponent
	],
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
		MatTabsModule,
		MatSelectModule
	],
})
export class HomeModule { }
