import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { SigninUser } from '~app/shared/models/auth';
import { AuthService } from '~app/shared/services/auth.service';
import { RootState } from '~app/shared/store';
import { currentAuthRequested } from '~app/shared/store/auth/auth.actions';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
	signinUser: SigninUser = new SigninUser();
	isLoading: boolean = false;

	signinForm = this.fb.group({
		user_name: [this.signinUser.user_name, [Validators.required]],
		password: [this.signinUser.password, [Validators.required]],
	});

	constructor(
		private fb: FormBuilder,
		private store: Store<RootState>,
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	get user_name() {
		return this.signinForm.get('user_name')!;
	}

	get password() {
		return this.signinForm.get('password')!;
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			user_name: this.signinForm.value.user_name,
			password: this.signinForm.value.password,
		};
		if (!payload.user_name || !payload.password) {
			return;
		}
		this.isLoading = true;
		this.authService
			.signin(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((user) => {
				this.store.dispatch(
					currentAuthRequested({
						user: user.data.user,
						tokens: {
							access_token: {
								token: user.data.tokens.access_token.token,
							},
						},
					})
				);
				this.cookieService.set(
					'access_token',
					user.data.tokens.access_token.token
				);
				window.location.href = '/';
			});
	}
}
