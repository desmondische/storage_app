import { StorageService } from './../../core/services/storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home.component';
import { StorageFormComponent } from './components/storage-form/storage-form.component';

@NgModule({
    declarations: [HomeComponent, StorageFormComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule
    ],
    exports: [],
})
export class HomeModule {}
