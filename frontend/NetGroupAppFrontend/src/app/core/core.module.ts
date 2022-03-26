import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { StorageService } from './services/storage.service';

@NgModule({
    declarations: [
    HeaderComponent
  ],
    imports: [CommonModule, HttpClientModule, MatToolbarModule],
	providers: [StorageService],
	exports: [HeaderComponent]
})
export class CoreModule {}
