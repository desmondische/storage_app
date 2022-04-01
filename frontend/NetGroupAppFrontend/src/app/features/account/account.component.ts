import { AuthService } from '../../core/services/auth/auth.service';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { UserModel } from 'src/app/core/models/auth/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
	@HostBinding('class.account') hostCssClass = true;

	isRegister = false;
	accountAction = 'Sign Up';

	user: UserModel = {
		username: '',
		password: ''
	}

	form!: FormGroup;
	loading = false;
	submitted = false;
	formBuilder: any;

	constructor(
		private service: AuthService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.form = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	get f() { return this.form.controls; }

	ngOnInit(): void {
		if (localStorage.getItem('jwt'))
			this.router.navigate(['/home']);
	}

	switchToRegister(): void {
		if (this.isRegister) {
			this.accountAction = 'Sign Up';
			this.isRegister = false;
		}
		else {
			this.isRegister = true;
			this.accountAction = 'Sign In'
		}
	}

	onSubmit(): void {
		if (this.form.invalid) {
			return;
		}

		this.loading = true;

		if (this.isRegister)
			this.register();

		else this.login();
	}

	login(): void {
		this.user = {
			username: this.f['username'].value,
			password: this.f['password'].value,
		}

		this.service.login(this.user).pipe(
			first()
		).subscribe(
			response => {
				const token = (<any>response).token;
				localStorage.setItem('jwt', token);

				setTimeout(() => {
					location.reload();
				}, 1);

				this.router.navigate(['/home']);
				console.log(response);
			}
		)
	}

	register(): void {
		this.service.register(this.form.value).pipe(
			first()
		).subscribe(
			response => {
				console.log(response);
				this.isRegister = false;
				this.accountAction = 'Sign Up';
			}
		)
	}
}
