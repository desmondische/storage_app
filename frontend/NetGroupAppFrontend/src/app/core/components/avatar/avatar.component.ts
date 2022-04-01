import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AvatarComponent {
	@HostBinding('class.avatar') hostCssClass = true;
	@Input() authToken!: string | null;

	constructor(private router: Router) { }

	logout(): void {
		localStorage.removeItem('jwt');
		this.authToken = null;
		this.router.navigate(['/account']);
		// location.reload();
	}
}
