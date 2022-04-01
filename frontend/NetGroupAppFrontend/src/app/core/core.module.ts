import { AvatarComponent } from './components/avatar/avatar.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StorageService } from './services/storage/storage.service';
import { ItemService } from './services/item/item.service';

@NgModule({
	declarations: [AvatarComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MatToolbarModule
	],
	providers: [
		StorageService,
		ItemService,
		AuthService,
		AuthGuard
	],
	exports: [AvatarComponent]
})
export class CoreModule { }
