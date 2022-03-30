import { UploadService } from '../../services/upload/upload.service';
import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [UploadService]
})
export class UploadComponent implements OnInit {

	message: string | undefined;
	progress: number | undefined;

	@Output() onUploadFinished = new EventEmitter();

	constructor(
		private service: UploadService
	) { }

	ngOnInit(): void {
	}

	uploadFile = (files: any) => {
		if (files.length === 0)
			return;

		let fileToUpload = <File>files[0];
		const formData = new FormData();
		formData.append('file', fileToUpload, fileToUpload.name);

		this.service.uploadFile(formData).subscribe(
			event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress = Math.round(100 * event.loaded / event.total!)
				}
				else if (event.type === HttpEventType.Response) {
					this.message = 'OK'
					this.onUploadFinished.emit(event.body);
				}
			}
		)
	}

}
