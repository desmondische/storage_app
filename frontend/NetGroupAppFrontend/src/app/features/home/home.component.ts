import { Component, HostBinding, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
	@HostBinding('class.home') hostCssClass = true;
	authToken = localStorage.getItem('jwt');
}
