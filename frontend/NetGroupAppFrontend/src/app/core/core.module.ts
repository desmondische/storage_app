import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StorageService } from './services/storage/storage.service';
import { ItemService } from './services/item/item.service';

@NgModule({
	declarations: [
	],
	imports: [CommonModule, HttpClientModule, MatToolbarModule],
	providers: [StorageService, ItemService]
})
export class CoreModule { }
